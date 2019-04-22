const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CourseSchema = new Schema({
  // Create Schemma
  name: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "userdetails"
  },
  savedname: {
    type: String
  },
  location: {
    type: String
  },
  courseuid: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("uploadedfiles", CourseSchema);
