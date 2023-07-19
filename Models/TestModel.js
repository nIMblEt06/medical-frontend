const mongoose = require("mongoose");

const testSchema = mongoose.Schema(
  {
    patientId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};
export default mongoose.model("Test", testSchema);
