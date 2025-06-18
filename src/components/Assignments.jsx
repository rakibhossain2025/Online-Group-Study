import React, { useState } from "react";
import { useLoaderData } from "react-router";
import AssignmentCard from "./AssignmentCard";
import GetUser from "../context/GetUser";

const Assignments = () => {
  const initialAssignments = useLoaderData();
  const [assignments, setAssignments] = useState(initialAssignments);
  const { user } = GetUser()

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {assignments?.map((assignment) => (
          <AssignmentCard
            key={assignment._id}
            assignment={assignment}
            userEmail={user?.email}
            assignments={assignments}
            setAssignments={setAssignments}
            onDelete={(id) => setAssignments((prev) => prev.filter(a => a._id !== id))}
          />
        ))}
      </div>
    </div>
  );
};


// asan?? hea vai ui thaka jaitasa na kno koi dekh

export default Assignments;
