"use client";
import React, { useState } from "react";
import axios from "axios";
import "@/app/home.css";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tests, setTests] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://medical-frontend-mu.vercel.app/api/getTests?patientId=${searchTerm}`
      );
      setTests(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home">
      <div className="p-6 mx-auto bg-[#f5f5f53f] rounded-xl shadow-md flex items-center space-x-4">
        <div className="flex-1">
          <form onSubmit={handleSearch} className="bg-transparent">
            <div className="mb-4">
              <label className="block text-white text-xl font-bold mb-2">
                Search by patient ID:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-yellow-500 w-full hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>
          {tests.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Test Results:</h2>
              <ul>
                {tests.map((test, index) => (
                  <li key={index} className="text-lg text-white">
                    {test.name} - {test.date.slice(0, 10)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
