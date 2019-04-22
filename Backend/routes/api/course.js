var express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//  Profile Model
const Course = require("../../models/Course");
const validateCourseInput = require("../../validation/course");
const Enroll = require("../../models/EnrolledCourse");

MongoClient = require("mongodb").MongoClient;

//var kafka = require("../../kafka/client");

router.delete(
  "/course/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    kafka.make_request("deletecourse", req.params, function(err, result) {
      console.log(" KAFKA: Test Course Delete  ");

      if (err == null) {
        console.log(" KAFKA : Success Delete Course.");
        res.json(result);
      } else {
        console.log(" KAFKA : Failure Delete Course.");
        res.status(400).json(err);
      }
    });
  }
);

var url =
  "mongodb+srv://vaibhav:vaibhav@cluster0-rwiul.mongodb.net/CanvasDB?retryWrites=true";
MongoClient.connect(url, function(err, db) {
  //here db is the client obj
  if (err) throw err;
  var dbase = db.db("mydb"); //here
  dbase.createCollection("counters", function(err) {
    if (err) throw err;

    var userCollection = dbase.collection("counters");
    userCollection.findOne({ _id: "courseuid2" }).then(course => {
      if (course) {
        console.log("Already Exist!");
        db.close();
      } else {
        userCollection.insertOne({ _id: "courseuid2", sequence_value: 0 });
        console.log("Collection created!");
        db.close(); //close method has also been moved to client obj
      }
    });
  });
});

const getNextSequenceValue = () =>
  MongoClient.connect(url, function(err, db) {
    //here db is the client obj
    if (err) throw err;
    var dbase = db.db("mydb"); //here

    var userCollection = dbase.collection("counters");
    userCollection.findOne({ _id: "courseuid" }).then(course => {
      if (course) {
        // Update
        userCollection
          .findOneAndUpdate(
            { _id: "courseuid" },
            { $set: { sequence_value: course.sequence_value + 1 } },
            { new: true }
          )
          .then(course => {
            db.close();
          });
      } else {
        db.close();
      }
    });
  });

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  "/course",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCourseInput(req.body);

    // // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const corurseFields = {};
    corurseFields.user = req.user.id;
    if (req.body.uid) {
      corurseFields.uid = req.body.uid;
    } else {
      corurseFields.uid = "999999";
    }
    if (req.body.courseid) corurseFields.courseid = req.body.courseid;
    if (req.body.coursename) corurseFields.coursename = req.body.coursename;
    if (req.body.coursedept) corurseFields.coursedept = req.body.coursedept;
    if (req.body.coursedescription)
      corurseFields.coursedescription = req.body.coursedescription;
    if (req.body.courseroom) corurseFields.courseroom = req.body.courseroom;
    if (req.body.coursecapacity)
      corurseFields.coursecapacity = req.body.coursecapacity;
    if (req.body.waitlistcapacity)
      corurseFields.waitlistcapacity = req.body.waitlistcapacity;
    if (req.body.courseterm) corurseFields.courseterm = req.body.courseterm;
    if (req.body.createdby) corurseFields.createdby = req.body.createdby;

    Course.findOne({ uid: corurseFields.uid }).then(course => {
      if (course) {
        // Update
        Course.findOneAndUpdate(
          { user: req.user.id },
          { $set: corurseFields },
          { new: true }
        ).then(course => res.json(course));
      } else {
        MongoClient.connect(url, function(err, db) {
          //here db is the client obj
          if (err) throw err;
          var dbase = db.db("mydb");
          var userCollection = dbase.collection("counters");

          userCollection.findOne({ _id: "courseuid" }).then(v => {
            if (v) {
              // Update
              userCollection
                .findOneAndUpdate(
                  { _id: "courseuid" },
                  { $set: { sequence_value: v.sequence_value + 1 } },
                  { new: true }
                )
                .then(x => {
                  corurseFields.uid = x.value.sequence_value;
                  console.log("corurseFields.uid ", corurseFields.uid);
                  new Course(corurseFields).save().then(z => {
                    res.json(z);
                    db.close();
                  });
                });
            } else {
              db.close();
            }
          });
        });
      }
    });
  }
);

router.post(
  "/enroll",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateCourseInput(req.body);

    // // // Check Validation
    // if (!isValid) {
    //   // Return any errors with 400 status
    //   return res.status(400).json(errors);
    // }

    const errors = {};

    const corurseFields = {};
    corurseFields.user = req.user.id;

    console.log(req.user.id);
    console.log(req.body);

    corurseFields.student_oid = req.user.id;
    corurseFields.course_oid = req.body.id;
    corurseFields.enrolledstatus = "Enrolled";
    corurseFields.waitlistStatus = "NA";

    Enroll.findOne({
      student_oid: corurseFields.student_oid,
      course_oid: corurseFields.course_oid
    }).then(course => {
      if (course) {
        // Update
        errors.handle = "That handle already exists";
        res.status(400).json(errors);
      } else {
        // Save Profile
        new Enroll(corurseFields).save().then(profile => res.json(profile));
      }
    });
  }
);

router.post(
  "/drop",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateCourseInput(req.body);

    // // // Check Validation
    // if (!isValid) {
    //   // Return any errors with 400 status
    //   return res.status(400).json(errors);
    // }

    const errors = {};
    const corurseFields = {};

    corurseFields.user = req.user.id;
    console.log(req.user.id);
    console.log(req.body);

    corurseFields.enrolledstatus = "Dropped";

    Enroll.findOne({
      _id: req.body.id
    }).then(course => {
      if (course) {
        // Update
        Enroll.findOneAndUpdate(
          { _id: req.body.id },
          { $set: corurseFields },
          { new: true }
        ).then(course => res.json(course));
      } else {
        // Save Profile
        //new Enroll(corurseFields).save().then(profile => res.json(profile));
      }
    });
  }
);

router.get(
  "/course",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    console.log(req.query);
    Course.find({ user: req.query._id })
      //.populate('user', ['name', 'avatar'])
      .then(course => {
        if (!course) {
          errors.noprofile = "There is no course created by the Faculty";
          res.status(404).json(errors);
        }

        res.json(course);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.get(
  "/enroll",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("CanvasDB");
      dbo
        .collection("enrolledcourses")
        .aggregate([
          {
            $lookup: {
              from: "coursedetails", //
              localField: "course_oid",
              foreignField: "uid",
              as: "data1"
            }
          }
        ])
        .toArray(function(err, x) {
          if (err) throw err;

          //console.log("data", x;)
          var data = x.filter(x => {
            return x.student_oid === req.query._id;
          });
          res.json(data);

          db.close();
        });
    });
  }
);

router.get(
  "/addcourse",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    //const { selection, value } = ;

    console.log("req.query._courseSearch", req.query.value);

    if (req.query.selection == "Name") {
      console.log(req.query);
      Course.find({ coursename: req.query.value })
        //.populate('user', ['name', 'avatar'])
        .then(course => {
          if (!course) {
            errors.noprofile = "There is no course created by the Faculty";
            res.status(404).json(errors);
          }

          res.json(course);
        })
        .catch(err => res.status(404).json(err));
    }

    if (req.query.selection === "Id") {
      console.log(req.query);
      Course.find({ courseid: req.query.value })
        //.populate('user', ['name', 'avatar'])
        .then(course => {
          if (!course) {
            errors.noprofile = "There is no course created by the Faculty";
            res.status(404).json(errors);
          }

          res.json(course);
        })
        .catch(err => res.status(404).json(err));
    }

    if (req.query.selection == "Term") {
      console.log(req.query);
      Course.find({ courseterm: req.query.value })
        //.populate('user', ['name', 'avatar'])
        .then(course => {
          if (!course) {
            errors.noprofile = "There is no course created by the Faculty";
            res.status(404).json(errors);
          }

          res.json(course);
        })
        .catch(err => res.status(404).json(err));
    }

    if (req.query.selection == "ALL") {
      console.log(req.query);
      Course.find()
        //.populate('user', ['name', 'avatar'])
        .then(course => {
          if (!course) {
            errors.noprofile = "There is no course created by the Faculty";
            res.status(404).json(errors);
          }

          res.json(course);
        })
        .catch(err => res.status(404).json(err));
    }
  }
);

module.exports = router;
