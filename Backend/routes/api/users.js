const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
//var kafka = require("../../kafka/client");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const EnrollledCourse = require("../../models/EnrolledCourse");
// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // kafka.make_request("register", req.body, function(err, result) {
  //   console.log("In results Signup");
  //   console.log("Results: ", result);
  //   if (!result == null) {
  //     console.log("Inside User else");
  //     const avatar = gravatar.url(msg.email, {
  //       s: "200", // Size
  //       r: "pg", // Rating
  //       d: "mm" // Default
  //     });

  //     const newUser = new User({
  //       name: msg.name,
  //       email: msg.email,
  //       job: msg.job,
  //       avatar,
  //       password: msg.password
  //     });
  //     bcrypt.genSalt(10, (err, salt) => {
  //       bcrypt.hash(newUser.password, salt, (err, hash) => {
  //         if (err) callback(err, null);
  //         // throw err;
  //         newUser.password = hash;
  //         newUser
  //           .save()
  //           .then(user => res.json(user))
  //           .catch(err => console.log(err));
  //       });
  //     });
  //   } else if (result == null && err == null) {
  //     console.log("User already exists.");
  //     res.status(210).json({ message: "duplicate user" });
  //   }
  //   if (err) {
  //     res.status(400).json({ message: "unable to fetch users" });
  //   }
  // });

  // const { errors, isValid } = validateRegisterInput(req.body);

  // // Check Validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        job: req.body.job,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post(
  "/uploadFiles",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("test File");
    console.log(req.file);
    console.log(req.body);
  }
);

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          name: user.name,
          job: user.job,
          avatar: user.avatar
        }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

router.get("/enrolledstudents", (req, res) => {
  const errors = {};

  console.log("req.params.id", req.query._uid);

  EnrollledCourse.find(
    { course_oid: req.query._uid },
    { student_oid: 1, _id: 0 }
  ).then(x => {
    let reslt = x.map(z => z.student_oid);
    console.log(reslt);

    User.find({ _id: { $in: reslt } }).then(m => {
      console.log(m);
      res.json(m);
    });

    // Profile.find({ user: { $in: reslt } })
    //   .populate("user", ["name", "email"])
    //   .then(m => console.log(m));
  });
});

router.post(
  "/dropstudent",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(" req.body", req.params);
    // console.log(" req.body.uid ", req.params.uid);
    // console.log("  req.user.id  ", req.user.id);
    // console.log("  exp_id  ", req.params.exp_id);

    console.log("req.body.coid", req.body.coid);
    console.log("req.body.soid", req.body.soid);
    EnrollledCourse.findOneAndRemove({
      course_oid: req.body.coid,
      student_oid: req.body.soid
    }).then(() => res.json({ success: true }));
  }
);

module.exports = router;
