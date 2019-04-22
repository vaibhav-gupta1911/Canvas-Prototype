const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAssignmentCreation(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.details = !isEmpty(data.details) ? data.details : "";
  data.upto = !isEmpty(data.upto) ? data.upto : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.details)) {
    errors.details = "Detials field is required";
  }

  if (Validator.isEmpty(data.upto)) {
    errors.upto = "Submit By field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
