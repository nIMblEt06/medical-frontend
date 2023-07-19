import TestModel from "@/Models/TestModel"; // Import your Test Model
import connectDb from "@/DB/db";

const getTests = async (req, res) => {
  const { patientId } = req.query;

  if (!patientId) {
    return res.status(400).json({ message: "Patient ID is required" });
  }

  try {
    // Assuming tests are linked to patients via patientId
    const tests = await TestModel.find({ patientId: patientId });

    // Assuming test is an object that contains the test name and date
    // And that those are the only details we want to send back
    const testDetails = tests.map((test) => ({
      name: test.name,
      date: test.createdAt,
    }));

    res.status(200).json(testDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export default connectDb(getTests);
