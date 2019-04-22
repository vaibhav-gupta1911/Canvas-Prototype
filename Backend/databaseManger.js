var mysql = require("mysql");
var encryptionManager = require("./encryptionManager");
var databaseManger = {};

databaseManger.pool = mysql.createPool({
  connectionLimit: "100",
  port: "3306",
  host: "localhost",
  user: "root",
  password: "vaibhav@19",
  database: "canvasdatabase"
});

let conn;
//Connecting to database
databaseManger.pool.getConnection(function(err, connection) {
  if (err) {
    console.error("error connecting to dayabase: " + err.stack);
    return;
  }
  conn = connection;
  console.log("connected to database with id: " + connection.threadId);
});

// Create new User
databaseManger.createUser = function(user, successCallback, failureCallback) {
  console.log("Inside create new user request handler");

  let cryptedPassword;
  encryptionManager.createHash(
    user.password,
    function(res) {
      cryptedPassword = res;

      var newUser = {
        name: user.name,
        mail: user.mail,
        role: user.role,
        password: cryptedPassword
      };

      console.log("creating new user in database");

      var sqlquery = "INSERT INTO UserDetails SET ?";
      conn.query(sqlquery, newUser, function(err, result) {
        if (err) {
          console.log(err);
          failureCallback(err);
          return;
        }
        successCallback();
      });
      console.log("User Added Successfully!!!!");
    },
    function(err) {
      console.log(err);
      failureCallback();
    }
  );
};

databaseManger.searchUser = function(user, successCallback, failureCallback) {
  var sqlQuery = "SELECT * FROM userdetails WHERE mail = '" + user.mail + "';";
  console.log("Test Datamanager" + user);

  //var sqlQuery = "SELECT * FROM UserDetails WHERE mail = '" + user.Mail + "';";
  conn.query(sqlQuery, function(err, rows, fields, resp) {
    if (err) {
      failureCallback(err);
      return;
    }
    if (rows.length > 0) {
      successCallback(rows[0]);
    } else {
      console.log(user.mail);
      failureCallback("User does not exist in database");
    }
  });
};

module.exports = databaseManger;
