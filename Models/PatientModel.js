const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true,
    },
    tests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },
    ],
    dateOfBirth: { type: String, required: true },
    aadharId: { type: Number, required: true },
    yhId: { type: Number, required: true },
    phoneNumber: { type: Number, required: true, maxLength: 10 },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Patient", PatientSchema);
