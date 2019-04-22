//import the require dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const jwt = require("jsonwebtoken");
var cors = require("cors");

var encryptionManager = require("./encryptionManager");
var mysql = require("mysql");
var databaseManger = require("./databaseManger");

app.set("view engine", "ejs");

app.set("view engine", "ejs");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const course = require("./routes/api/course");
const fileupload = require("./routes/api/fileupload");
const assignment = require("./routes/api/assignment");

// Database Config
const db = require("./config/keys").mongoUri;
const key = require("./config/keys").secretOrKey;

//Coonect to Mongo DB
mongoose
  .connect(db)
  .then(() => console.log("connected to db"))
  .catch(err => console.log(err));

//Passport moiddleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/course", course);
app.use("/api/posts", posts);
app.use("/api/fileupload", fileupload);
app.use("/api/assignment", assignment);

app.post("/logintest1", function(req, loginRes) {
  loginRes.writeHead(200, {
    "Content-Type": "text/plain",
    success: true
  });
  loginRes.end(JSON.stringify("Succesfully user created"));
});

app.get("/logintest2", function(req, res) {
  const payload = {
    id: "response.username",
    mail: "response.mail"
  };

  jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
    res.json({
      success: true,
      token: "Bearer " + token
    });
  });

  //   res.end(JSON.stringify("Succesfully user created"));
});

///*************** Start new User Sing Up ***************///

app.post("/signup", function(req, response) {
  console.log("Inside create new user request handler");
  console.log(req.body);

  if (!req.body.Name || !req.body.Mail || !req.body.Password) {
    response
      .status(400)
      .json({ success: false, message: "Please enter all fields." });
  } else {
    var newUser = {
      name: req.body.Name,
      mail: req.body.Mail,
      password: req.body.Password,
      role: req.body.Role
    };

    // Attempt to save the user
    databaseManger.createUser(
      newUser,
      function(res) {
        var sql =
          "SELECT userid FROM userdetails WHERE mail = '" + newUser.mail + "';";

        databaseManger.pool.getConnection(function(err, con) {
          con.query(sql, function(err, rows) {
            userid = rows[0].userid;

            console.log("Inside create new user request handlerccc");

            var sqlQry1 =
              "INSERT INTO ProfileDetails(ProfileId,Name,Email) VALUES ( " +
              mysql.escape(userid) +
              " , " +
              mysql.escape(newUser.name) +
              " , " +
              mysql.escape(newUser.mail) +
              " )";
            databaseManger.pool.getConnection(function(err, con) {
              console.log("Inside create new user request handlerddd");

              con.query(sqlQry1, function(err, rows) {
                console.log("Profile created");
              });

              response.writeHead(200, {
                "Content-Type": "text/plain"
              });
              response.end("Succesfully user created");
            });
          });
        });
      },
      function(err) {
        console.log(err);
        return response.end("Failed to create new user.");
        //res.status(400).json({ success: false, message: 'That username address already exists.' });
      }
    );
  }
});

///*************** End new User Sing Up ***************///

///*************** Start Log In ***************///
app.post("/login", function(req, loginRes) {
  console.log("Inside Login Post Request");
  console.log("Req Body : ", req.body);

  let reqq = {
    mail: req.body.username, // 'vaibhav1911@gmail.com',
    Password: req.body.password //'vaibhav@123'
  };

  // let reqq = {
  //   mail: "c@c",
  //   Password: "c"
  // };

  console.log("Req Body : ", reqq);

  databaseManger.searchUser(
    {
      mail: reqq.mail
    },
    function(response) {
      const user = {
        mail: response.mail
      };

      console.log("validating encryted password");
      console.log(reqq.Password);
      console.log(response.password);

      // callback(response);
      encryptionManager.compareHash(
        reqq.Password,
        response.password,
        function(err, isEqual) {
          if (isEqual && !err) {
            console.log("Password matched");

            const payload = {
              id: "response.username",
              mail: "response.mail"
            };

            jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
              loginRes.writeHead(200, {
                "Content-Type": "text/plain",
                token: "Bearer " + token,
                success: true
              });

              loginRes.end(JSON.stringify("Succesfully user created"));
            });
          } else {
            console.log("Failed login password");
            loginRes.writeHead(401, {
              "Content-Type": "text/plain"
            });
            // res.end("Login failed: Invalid password");
          }
        },
        function(err) {
          console.log(err);
          // response.status(401).json({success: false, message: 'Authentication failed. User not found.'});
          console.log("Failed login - invalid user msg1");
          loginRes.writeHead(401, {
            "Content-Type": "text/plain"
          });
          // res.end("Login failed: Invalid user");
        }
      );
    },
    function(err) {
      console.log(err);
      //response.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
      console.log("Failed login - invalid user msg2");
      loginRes.writeHead(401, {
        "Content-Type": "text/plain"
      });
      // res.end("Login failed: Invalid user");
    }
  );
});

//start your server on port 3001
//const port = process.env.PORT || 3001;
//app.listen(3001, () => console.log("Server Listening on port 3001"));
