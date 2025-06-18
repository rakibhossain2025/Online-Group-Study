import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  reviewed: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const Pending = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:2002/pending", {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, [user.accessToken]);

  const handleGiveMark = (assignment) => {
    setSelectedAssignment(assignment);
    setModalOpen(true);
  };

  const submitAReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const marks = form.marks.value;
    const feedback = form.feedback.value;

    setLoading(true);
    axios
      .patch(`http://localhost:2002/mark/${selectedAssignment._id}`, {
        id: selectedAssignment._id,
        givenMark: marks,
        feedback,
        totalMark: selectedAssignment.mark,
        examineName: selectedAssignment.examineName,
        status: "reviewed",
        title: selectedAssignment.title,
        examinerEmail: userEmail,
        examinerName: user?.displayName,
      }, { headers: { Authorization: `Bearer ${user?.accessToken}` } })
      .then(() => {
        setData((prev) => prev.filter((item) => item._id !== selectedAssignment._id));
        setModalOpen(false);
        setSelectedAssignment(null);
      })
      .catch((err) => {
        console.error("Error submitting review:", err);
        alert("Failed to submit marks");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((d) => (
            <div
              key={d._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">{d.title}</h3>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${statusStyles[d.status] || "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                  </span>
                </div>
                <p className="mt-3 text-gray-600 text-sm line-clamp-3">
                  {d.description || "No description provided."}
                </p>
              </div>

              {/* Card Footer */}
              <div className="bg-gray-100 p-4 rounded-b-xl flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  By: <strong className="text-gray-900">
                    {d.examineEmail === userEmail ? "You" : d.examineName}
                  </strong>
                </span>

                {d.examineEmail !== userEmail && (
                  <button
                    onClick={() => handleGiveMark(d)}
                    className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                  >
                    Give Mark
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-20">
          No Pending Assignments Found!
        </p>
      )}

      {/* Modal */}
      {modalOpen && selectedAssignment && (
        <div className="modal modal-open backdrop-blur-sm">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-lg mb-2">{selectedAssignment.title}</h3>
            <p>
              <a
                href={selectedAssignment.docsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Google Docs
              </a>
            </p>
            <p className="my-2">{selectedAssignment.notes || "No notes provided"}</p>

            <form onSubmit={submitAReview} className="mt-4 space-y-4">
              <input
                type="number"
                placeholder="Marks"
                required
                name="marks"
                className="input input-bordered w-full"
              />
              <textarea
                placeholder="Feedback"
                name="feedback"
                rows={4}
                className="textarea textarea-bordered w-full"
              />
              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setSelectedAssignment(null);
                  }}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pending;