const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CourseSchema = new Schema({
  // Create Schema
  uid: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "userdetails"
  },
  courseid: {
    type: String,
    required: true
  },
  coursename: {
    type: String
  },
  coursedept: {
    type: String
  },
  coursedescription: {
    type: String
  },
  courseroom: {
    type: String
  },
  coursecapacity: {
    type: String
  },
  waitlistcapacity: {
    type: String
  },
  courseterm: {
    type: String
  },
  createdby: {
    type: String
  }
});

module.exports = User = mongoose.model("coursedetails", CourseSchema);
