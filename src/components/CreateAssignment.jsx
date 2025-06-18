import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const CreateAssignment = () => {
  const [dueDate, setDueDate] = useState(new Date());
  const { user } = useContext(AuthContext);

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const submitAssignment = Object.fromEntries(formData.entries());
    submitAssignment.createdBy = user?.email;
    submitAssignment.dueDate = dueDate.toISOString().split("T")[0];
    fetch("http://localhost:2002/assignments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(submitAssignment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Assignment created successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        }
      });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6">
      <h2 className="text-3xl font-extrabold text-center text-gray-800">
        Create Assignment
      </h2>

      <form onSubmit={handleAssignmentSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Assignment Title"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          name="description"
          placeholder="Assignment Description"
          rows="4"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>

        <input
          type="number"
          name="marks"
          placeholder="Marks"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail Image URL"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          name="difficulty"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <input
          type="email"
          name="email"
          value={user?.email || ""}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-700 cursor-not-allowed"
          placeholder="Your email"
          title="Your email"
        />

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Due Date
          </label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            dateFormat="yyyy-MM-dd"
            name="dueDate"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold py-3 rounded-lg"
        >
          Submit Assignment
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
