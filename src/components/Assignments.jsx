import React, { useState } from "react";
import { useLoaderData } from "react-router";
import AssignmentCard from "./AssignmentCard";

const Assignments = () => {
  const initialAssignments = useLoaderData();
  const [assignments, setAssignments] = useState(initialAssignments);

  // console.log(assignments);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment._id}
            assignments={assignments}
            setAssignments={setAssignments}
            assignment={assignment}
            
          ></AssignmentCard>
        ))} */}
        {assignments.map((assignment) => (
  <AssignmentCard
    key={assignment._id}
    assignment={assignment}
    assignments={assignments}
    setAssignments={setAssignments}
    onDelete={(id) =>
      setAssignments((prev) => prev.filter((a) => a._id !== id))
    }
  />
))}
      </div>
    </div>
  );
};

export default Assignments;
