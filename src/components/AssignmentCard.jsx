// import React from "react";

// const AssignmentCard = ({assignment}) => {

//     const {title, description, marks, thumbnail, difficulty} = assignment;

//   return (
//     <div className="card card-side bg-base-100 shadow-sm">
//       <figure>
//         <img
//           src={thumbnail}
//           alt="Movie"
//         />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">New movie is released!</h2>
//         <p>Click the button to watch on Jetflix app.</p>
//         <div className="card-actions justify-end">
//           <button className="btn btn-primary">Watch</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssignmentCard;

// import React from "react";
// import { Pencil, Trash2, Eye } from "lucide-react";
// import Swal from "sweetalert2";

// const AssignmentCard = ({ assignment }) => {
//   const {_id, title, description, marks, thumbnail, difficulty } = assignment;

//   const handleDelete = (_id) => {
//     console.log(_id)
//     Swal.fire({
//   title: "Are you sure?",
//   text: "You won't be able to revert this!",
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonColor: "#3085d6",
//   cancelButtonColor: "#d33",
//   confirmButtonText: "Yes, delete it!"
// }).then((result) => {
//   console.log(result.isConfirmed)
//   if (result.isConfirmed) {

//     fetch(`http://localhost:2002/assignments/${_id}`, {
//       method: 'DELETE'
//     })
//     .then(res => res.json())
//     .then(data => {
//       console.log(data)
//     })

//     Swal.fire({
//       title: "Deleted!",
//       text: "Your file has been deleted.",
//       icon: "success"
//     });
//   }
// });
//   }

//   const difficultyColors = {
//     easy: "bg-green-500",
//     medium: "bg-yellow-500",
//     hard: "bg-red-500",
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col md:flex-row">
//       {/* Thumbnail Image */}
//       <div className="md:w-1/3 w-full h-60 md:h-auto overflow-hidden">
//         <img
//           src={thumbnail || "https://via.placeholder.com/400x300?text=Assignment"}
//           alt={title}
//           className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
//         />
//       </div>

//       {/* Content Section */}
//       <div className="md:w-2/3 p-6 flex flex-col justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
//           <p className="text-gray-700 text-sm mb-4 line-clamp-3">{description}</p>

//           <div className="flex items-center justify-between mb-4">
//             <span className="text-sm font-medium text-indigo-600">
//               Marks: <span className="font-bold">{marks}</span>
//             </span>

//             {difficulty && (
//               <span
//                 className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${
//                   difficultyColors[difficulty.toLowerCase()] || "bg-gray-400"
//                 }`}
//               >
//                 {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-3 mt-4">
//           <button className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition">
//             <Eye size={16} /> View
//           </button>
//           <button className="flex items-center gap-1 px-4 py-2 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600 transition">
//             <Pencil size={16} /> Update
//           </button>
//           <button onClick={() => handleDelete(_id)} className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition">
//             <Trash2 size={16} /> Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssignmentCard;

import React, { useContext } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
// import { AuthContext } from "../context/AuthContext";

const AssignmentCard = ({
  assignment,
  onDelete,
  assignments,
  setAssignments,
}) => {
  const { user } = useContext(AuthContext);
  const { _id, title, description, marks, thumbnail, difficulty, createdBy } =
    assignment;

  const handleDelete = (_id) => {
    if (user?.email !== createdBy) {
      Swal.fire({
        icon: "error",
        title: "Permission Denied!",
        text: "You can only delete assignments you have created.",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:2002/assignments/${_id}?email=${user?.email}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your assignment has been deleted.",
                "success"
              );
              onDelete(_id);
            }

            const remainingAssignments = assignments.filter(
              (ass) => ass._id !== _id
            );
            setAssignments(remainingAssignments);
          });
      }
    });
  };

  const difficultyColors = {
    easy: "bg-green-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500",
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/3">
        <img
          src={thumbnail || "https://via.placeholder.com/400x300"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="md:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-gray-700">{description}</p>
          <p className="text-sm text-indigo-600">Marks: {marks}</p>
          <p
            className={`text-xs font-semibold px-3 py-1 mt-2 rounded-full ${
              difficultyColors[difficulty?.toLowerCase()]
            }`}
          >
            {difficulty}
          </p>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Link to={`/assignments/${_id}`}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-1">
              <Eye size={16} /> View
            </button>
          </Link>
          <Link to={`/update-assignment/${_id}`}>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center gap-1">
              <Pencil size={16} /> Update
            </button>
          </Link>
          <button
            onClick={() => handleDelete(_id)}
            className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-1"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
