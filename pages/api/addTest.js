import connectDb from "@/DB/db";

const Test = require("@/Models/TestModel");

const addTest = async (req, res) => {
  const { id, category, date } = req.params;

  if (!id || !category || !date) {
    console.log("Proper param not sent with request");
    return res.sendStatus(400);
  }

  const testDetails = {
    patientId: id,
    testname: category,
    date: date,
  };

  try {
    // Create a new test
    const test = new Test(testDetails);
    await test.save();

    // Find the patient
    const patient = await Patient.findById(id);

    // add test to patient
    patient.tests.push(test);
    await patient.save();

    res.status(200).json({ message: "Test Added Succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default connectDb(addTest);
