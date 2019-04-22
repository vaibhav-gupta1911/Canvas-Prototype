var express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//  Profile Model
const Course = require("../../models/Course");
const validateCourseInput = require("../../validation/course");
const Enroll = require("../../models/EnrolledCourse");
const Note = require("../../models/Note");
const Assignment = require("../../models/Assignment");
const SubmittedAssignment = require("../../models/SubmittedAssignment");

//import the require dependencies
var path = require("path");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "E:/273_All/FileServer/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending .jpg
  }
});

var upload = multer({ storage: storage });
//multer({ dest: 'E:/273_All/FileServer/' })

const validateAssignmentCreation = require("../../validation/assignment");

router.post("/createassignment", upload.single("myImage"), function(
  req,
  res,
  next
) {
  console.log("req.headers", req.headers);

  const { errors, isValid } = validateAssignmentCreation(req.headers);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  var str_array = req.headers.id.split(",");

  for (var i = 0; i < str_array.length; i++) {
    const assi = new Assignment({
      user: req.headers.user,
      title: req.headers.title,
      details: req.headers.details,
      courseuid: str_array[i],
      upto: req.headers.upto,
      filepath: req.file ? req.file.path : "",
      filename: req.file ? req.file.originalname : ""
    });

    assi.save().then(x => console.log("Success insert"));
  }

  res.json("success");
});

router.get(
  "/studentassignments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    console.log(req.query);
    //var  x = req.query._coid
    var array = req.query.coid.split(",");
    Assignment.find({ courseuid: { $in: array } })
      //.populate('user', ['name', 'avatar'])
      .then(course => {
        if (!course) {
          errors.noprofile = "There is no assigmnet fetched";
          res.status(404).json(errors);
        }

        res.json(course);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.get(
  "/studentassignment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    console.log(req.query);
    //var  x = req.query._coid
    Assignment.findOne({ _id: req.query._id })
      //.populate('user', ['name', 'avatar'])
      .then(course => {
        if (!course) {
          errors.noprofile = "There is no assigmnet fetched";
          res.status(404).json(errors);
        }

        res.json(course);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post("/submitassignment", upload.single("myImage"), function(
  req,
  res,
  next
) {
  console.log("req.headers", req.body.uid);
  const subAssi = new SubmittedAssignment({
    user: req.headers.user,
    assignment: req.headers.aid,
    submissiondetails: req.headers.details,
    courseuid: req.headers.coid,
    submissionfilepath: req.file ? req.file.path : "",
    submissionfilename: req.file ? req.file.originalname : ""
  });

  subAssi.save().then(x => res.json("success"));
});

router.get(
  "/professorassignments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    console.log(req.query.id);
    Assignment.find({ user: req.query.id })
      .then(course => {
        if (!course) {
          errors.noprofile = "There is no assigmnet fetched";
          res.status(404).json(errors);
        }

        res.json(course);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.get(
  "/allsubassigments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    console.log(req.query.id);
    SubmittedAssignment.find({ assignment: req.query.coid })
      .populate("user", ["name", "email"])
      .then(course => {
        if (!course) {
          errors.noprofile = "There is no assigmnet fetched";
          res.status(404).json(errors);
        }

        res.json(course);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.get(
  "/gradingassignment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    console.log("dattttttttta", req.query.coid);
    console.log(req.query.id);
    SubmittedAssignment.find({ _id: req.query.coid })
      .populate("user", ["name", "email"])
      .then(course => {
        if (!course) {
          errors.noprofile = "There is no assigmnet fetched";
          res.status(404).json(errors);
        }

        res.json(course);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  "/gradeassignment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("id", req.body.id);
    console.log("grade", req.body.grade);
    const profileFields = {};
    profileFields.grade = req.body.grade;

    SubmittedAssignment.findOne({ _id: req.body.id }).then(profile => {
      if (profile) {
        // Update
        SubmittedAssignment.findOneAndUpdate(
          { _id: req.body.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        if (profile) {
          errors.handle = "Record not fouund";
          res.status(400).json(errors);
        }
      }
    });
  }
);
module.exports = router;
