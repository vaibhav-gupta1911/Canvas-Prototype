const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CourseSchema = new Schema({
  // Create Schemma
  user: {
    type: Schema.Types.ObjectId,
    ref: "userdetails"
  },
  assignment: {
    type: Schema.Types.ObjectId,
    ref: "assignments"
  },
  submissiondetails: {
    type: String
  },
  courseuid: {
    type: String
  },
  submissionfilepath: {
    type: String
  },
  submissionfilename: {
    type: String
  },
  grade: {
    type: String,
    default: "Not Graded"
  },
  submissionDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("submittedassignments", CourseSchema);
