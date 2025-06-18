import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Pending = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  console.log(user?.email)
  useEffect(() => {
    axios.get('http://localhost:2002/pending')
      .then(d => setData(d.data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  const submitAReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const marks = form.marks.value;
    const feedback = form.feedback.value;
    setLoading(true);

    axios.patch(`http://localhost:2002/mark/${selectedAssignment._id}`, {
      id: selectedAssignment._id,
      givenMark: marks,
      feedback,
      totalMark: selectedAssignment.mark,
      examineName: selectedAssignment.examineName,
      status: "reviewed",
      title: selectedAssignment.title,
      examinerEmail: user?.email,
      examinerName: user?.displayName
    })
      .then(() => {
        setData(prev => prev.filter(item => item._id !== selectedAssignment._id));
        setModalOpen(false);
        setSelectedAssignment(null);
      })
      .catch(err => {
        console.error("Error submitting review:", err);
        alert("Failed to submit marks");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          {data.map(d => (
            <div key={d._id} className="bg-gray-400/30 rounded-2xl p-4 space-y-2">
              <p><strong>Title:</strong> {d.title}</p>
              <p><strong>Description:</strong> {d.description}</p>
              <p><strong>Status:</strong> {d.status}</p>
              <p><strong>Submitted by:</strong> {d.examineEmail === user?.email && 'You' || d.examineEmail || "N/A"}</p>
              {d.examineEmail === user?.email ? "Awaiting review by an examiner" :
                <button className="btn btn-primary" onClick={() => {
                  setSelectedAssignment(d);
                  setModalOpen(true);
                }}>Give Mark</button>
              }
            </div>
          ))}
        </div>
      ) : <p className="text-center mt-10 text-lg">No Pending Assignments Found!</p>}

      {/* Modal */}
      {modalOpen && selectedAssignment && (
        <div className="modal modal-open backdrop-blur-sm">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-lg mb-2">{selectedAssignment.title}</h3>
            <p><a href={selectedAssignment.docsLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Google Docs</a></p>
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
              ></textarea>
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
    </>
  );
};

export default Pending;
