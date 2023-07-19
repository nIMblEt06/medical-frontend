import TestModel from "@/Models/TestModel";
import PatientModel from "@/Models/PatientModel";
import connectDb from "@/DB/db";
import moment from "moment";

const addPatient = async (req, res) => {
  const { name, category, aadhar, date, yh, number } = req.body;

  if (!name || !aadhar || !date || !yh || !number) {
    return res.status(400).json({ message: "All Fields are required" });
  }

  try {
    // Find tests by 'yh' id
    const oneMonthAgo = moment().subtract(1, "months").toDate();
    const recentTests = await TestModel.find({
      patientId: yh,
      createdAt: {
        $gte: oneMonthAgo,
      },
    });

    console.log(recentTests.length);

    if (recentTests.length > 0) {
      return res.status(200).json({ recentTests });
      // return res.status(200).json({ message: "User has history." });
    }
    else {
      const test = await TestModel.create({
        patientId: yh,
        name: category,
      });
  
      // Create a new patient
      let patient = await PatientModel.findOne({ yhId: yh });
  
      if (patient) {
        // If patient exists, add test id to the tests array
        patient.tests.push(test._id);
        await patient.save();
      } else {
        // If patient doesn't exist, create a new patient
        patient = await PatientModel.create({
          name: name,
          dateOfBirth: date,
          aadharId: aadhar,
          yhId: yh,
          phoneNumber: number,
          tests: [test._id], // add test id to the tests array
        });
      }
      res.status(200).json({ message: "Patient added successfully." });
    }

    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error." });
  }
};

export default connectDb(addPatient);
