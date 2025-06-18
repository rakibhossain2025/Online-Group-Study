import React from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const UpdateAssignment = () => {
  const { _id, title, description, marks, thumbnail, difficulty } = useLoaderData();


  const handleUpdateAssignment = e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updateAssignment = Object.fromEntries(formData.entries())
    console.log(updateAssignment)

    fetch(`http://localhost:2002/assignments/${_id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updateAssignment)
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })

  }

  return (
    <div>
      UpDaTe

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Create Assignment
        </h2>

        <form onSubmit={handleUpdateAssignment} className="space-y-5">
          <input
            type="text"
            name="title"
            defaultValue={title}
            placeholder="Assignment Title"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            name="description"
            defaultValue={description}
            placeholder="Assignment Description"
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>

          <input
            type="number"
            name="marks"
            defaultValue={marks}
            placeholder="Marks"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            name="thumbnail"
            defaultValue={thumbnail}
            placeholder="Thumbnail Image URL"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            name="difficulty"
            defaultValue={difficulty}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>




          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold py-3 rounded-lg"
          >
            Update Assignment
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAssignment;