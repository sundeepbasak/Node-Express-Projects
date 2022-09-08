const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide a company"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide a position"],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ["pending", "interview", "declined"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);

/* //** Mongoose schemas support a timestamps option. 
If we set timestamps: true, Mongoose will add two properties of type Date to your schema: 
---> createdAt : a date representing when this document was created. 
---> updatedAt : a date representing when this document was last updated.

*/
