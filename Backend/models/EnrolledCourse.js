const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CourseSchema = new Schema({
  // Create Schemma
  student_oid: {
    type: String
  },
  course_oid: {
    type: String
  },
  enrolledstatus: {
    type: String
  },
  waitlistStatus: {
    type: String
  }
});

module.exports = User = mongoose.model("enrolledcourses", CourseSchema);
