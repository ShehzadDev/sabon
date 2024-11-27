const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    summary: { type: String },
    experience: [
      {
        company: { type: String, required: true },
        role: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
      },
    ],
    education: [
      {
        school: { type: String, required: true },
        degree: { type: String },
        fieldOfStudy: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
    skills: [{ type: String }],
    connections: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
