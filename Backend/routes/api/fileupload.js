var express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//  Profile Model
const Course = require("../../models/Course");
const validateCourseInput = require("../../validation/course");
const Enroll = require("../../models/EnrolledCourse");
const Note = require("../../models/Note");

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

router.post("/uploadFiles", upload.single("myImage"), function(req, res, next) {
  var str_array = req.headers.mydata.split(",");

  for (var i = 0; i < str_array.length; i++) {
    const note = new Note({
      name: req.file.originalname,
      savedname: req.file.name,
      location: req.file.path,
      courseuid: str_array[i],
      user: req.headers.user
    });

    note.save().then(post => console.log("Success insert"));
  }

  res.json("success");
});

router.get("/viewuploads", (req, res) => {
  const errors = {};

  const ob = {};

  req.query._id ? (ob.user = req.query._id) : "";
  req.query._uid ? (ob.courseuid = req.query._uid) : "";

  console.log("req.params.id", req.query._uid);

  Note.find(ob)
    .then(data1 => {
      if (!data1) {
        return res.status(404).json("errors");
      }
      console.log("dataa", data1);
      res.json(data1);
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
