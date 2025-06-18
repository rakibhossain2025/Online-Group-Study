import React, { useContext } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import axios from "axios";

const AssignmentCard = ({ assignment, userEmail, onDelete, assignments, setAssignments, }) => {
  const { user } = useContext(AuthContext);
  const { _id, title, description, marks, thumbnail, difficulty, createdByEmail } =
    assignment;

  const handleDelete = () => {
    if (user?.email !== createdByEmail) {
      return Swal.fire({
        icon: "error",
        title: "Permission Denied",
        text: "You can only delete your own assignments.",
      });
    }
    console.log(user.email)

    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:2002/assignments/${_id}?email=${user?.email}`, {
          headers: { Authorization: `Bearer ${user.accessToken}` }
        })
          .then((data) => {
            if (data.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Assignment has been removed.", "success");
              onDelete(_id);
              const remaining = assignments.filter((a) => a._id !== _id);
              setAssignments(remaining);
            }
          });
      }
    });
  };
  
  const getDifficultyStyle = (level) => {
    switch (level?.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-all duration-300">
      <img
        src={thumbnail || "https://via.placeholder.com/400x300?text=Assignment"}
        alt={title}
        className="w-full md:w-1/3 h-48 object-cover rounded-xl"
      />

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">{title}</h2>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

          <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
            <span>
              <strong>Marks:</strong> {marks}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyStyle(
                difficulty
              )}`}
            >
              {difficulty || "Unknown"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 justify-end">
          <Link to={`/assignments/${_id}`}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-blue-700 text-sm">
              <Eye size={16} /> View
            </button>
          </Link>

          {userEmail === assignment.createdByEmail && (
            <>
              <Link to={`/update-assignment/${_id}`}>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-yellow-600 text-sm">
                  <Pencil size={16} /> Edit
                </button>
              </Link>

              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-red-700 text-sm"
              >
                <Trash2 size={16} /> Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
