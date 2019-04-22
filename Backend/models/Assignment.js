const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CourseSchema = new Schema({
  // Create Schemma
  user: {
    type: Schema.Types.ObjectId,
    ref: "userdetails"
  },
  title: {
    type: String
  },
  details: {
    type: String
  },
  courseuid: {
    type: String
  },
  filepath: {
    type: String
  },
  filename: {
    type: String
  },
  upto: {
    type: Date
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("assignments", CourseSchema);
