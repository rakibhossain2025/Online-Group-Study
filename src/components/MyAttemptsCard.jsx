const MyAttemptsCard = ({ dt }) => {
  return (
    <tr>
      <td>{dt.title || "Untitled"}</td>
      <td>
        {dt.status === "reviewed" ? (
          <span className="text-green-600 font-semibold">Reviewed</span>
        ) : (
          <span className="text-yellow-600 font-semibold">Pending</span>
        )}
      </td>
      <td>{dt.title || "N/A"}</td>
      <td>{dt.marks || "Not marked yet"}</td>
      <td>{dt.feedback || "No feedback yet"}</td>
      <td>{dt.examiner || "-"}</td>
    </tr>
  );
};

export default MyAttemptsCard;
