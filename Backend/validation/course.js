const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCourseInput(data) {
  let errors = {};

  data.courseid = !isEmpty(data.courseid) ? data.courseid : "";

  console.log("data is", data);
  console.log("id is", data.courseid);
  if (Validator.isEmpty(data.courseid)) {
    errors.courseid = "Course Id is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
