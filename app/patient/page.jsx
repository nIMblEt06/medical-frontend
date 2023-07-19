"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/app/home.css";
import axios from "axios";

const Patient = () => {
  const [inputState, setInputState] = useState({
    name: "",
    category: "",
    date: "",
    aadhar: "",
    number: "",
    yh: "",
  });

  const { name, category, date, aadhar, number, yh } = inputState;

  useEffect(() => {
    if (!localStorage.getItem("verified")) {
      alert("You're not verified!");
      window.location.href = "/";
    }
  }, []);

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from causing a page refresh
    try {
      if (!name || !category || !date || !aadhar || !number || !yh) {
        alert("Please fill out all fields");
        return;
      }

      let response = await axios.post(
        "http://localhost:3000/api/addPatient",
        inputState
      );

      if (response.status === 200) {
        alert(response.data.message);
        window.location.href = "/test";
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred, please try again.");
    }
  };

  return (
    <div className="home">
      <div className="text-3xl mb-2 uppercase font-bold">
        Add Patient Details
      </div>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full">
          <div className="font-bold text-lg w-2/5">Name</div>
          <input
            type="text"
            className="w-full"
            value={name}
            name={"name"}
            placeholder="Enter Patient Name"
            onChange={handleInput("name")}
          />
        </div>
        <div className="flex flex-col w-full mt-4">
          <div className="font-bold text-lg w-2/5">Phone Number</div>
          <input
            type="number"
            className="w-full"
            value={number}
            name={"number"}
            placeholder="Enter Phone Number"
            onChange={handleInput("number")}
          />
        </div>
        <div className="flex flex-col w-full mt-4">
          <div className="font-bold text-lg w-2/5">YH Number</div>
          <input
            type="number"
            className="w-full"
            value={yh}
            name={"yh"}
            placeholder="Enter YH ID"
            onChange={handleInput("yh")}
          />
        </div>

        <div className="flex flex-col w-full mt-4">
          <div className="font-bold text-lg mr-8 w-full">Select Test</div>
          <select
            required
            value={category}
            name="category"
            id="category"
            className="text-gray-500"
            onChange={handleInput("category")}
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="BloodTest">Blood Test</option>
            <option value="CTScan">CT Scan</option>
            <option value="X-Ray">X-Ray</option>
          </select>
        </div>
        <div className="flex flex-col w-full mt-4">
          <div className="font-bold text-lg mr-8 w-full">Date of Birth</div>
          <DatePicker
            id="date"
            placeholderText="Enter Date"
            className="w-full"
            selected={date}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => {
              setInputState({ ...inputState, date: date });
            }}
            required
          />
        </div>

        <div className="flex flex-col w-full mt-4">
          <div className="font-bold text-lg mr-8 w-full">
            Enter Passport/Aadhar Number
          </div>
          <input
            type="number"
            className="w-full"
            value={aadhar}
            name={"aadhar"}
            placeholder="Enter Passport/Aadhar Number"
            onChange={handleInput("aadhar")}
          />
        </div>
        {/* <button type = 'submit'>Click to submit</button> */}
        {/* {console.log(tests[0].date)} */}
        <>
          <button className="button" marginTop={"2rem"} onClick={handleSubmit}>
            Save
          </button>
          {/* {firstName||lastName||category||date ?  */}
        </>
      </form>
    </div>
  );
};

export default Patient;
