const MyAttemptsCard = ({ dt }) => {
  return (
    <tr className="bg-gray-200  hover:bg-gray-300">
      <td>{dt.title || "Untitled"}</td>
      <td>
        {dt.status === "reviewed" ? (
          <span className="text-green-600 font-semibold">Reviewed</span>
        ) : (
          <span className="text-yellow-600 font-semibold">Pending</span>
        )}
      </td>
      <td>{dt.TotalMarks || "N/A"}</td>
      <td>{dt.
        givenMark || "Not marked yet"}</td>
      <td>{dt.feedback || "No feedback yet"}</td>
      <td>{dt.examinerEmail
        || "-"}</td>
    </tr>
  );
};

export default MyAttemptsCard;
