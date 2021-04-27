const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = mongoose.model("Assignment", new Schema({

  moduleCode: {
    type: String,
    required: [true, "Module code is invalid."]
  },
  moduleName: {
    type: String,
    required: [true, "Module name is invalid."]
  },
  description: String,
  dueDate: Date,
  uploader: String,
  assignmentID: Number
}));
