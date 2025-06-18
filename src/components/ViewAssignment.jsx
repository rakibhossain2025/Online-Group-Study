import { useState, useContext } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import GetUser from '../context/GetUser';

const ViewAssignment = () => {
  const assignment = useLoaderData();
  const { user } = useContext(AuthContext);
  const { _id, title, description, marks, createdByEmail, thumbnail, difficulty } = assignment || {};
  const [modalOpen, setModalOpen] = useState(false);
  const [googleDocLink, setGoogleDocLink] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const submitAssignment = async (e) => {
    e.preventDefault();
    if (!googleDocLink) return alert('Google Docs link must be provided!');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:2002/take-assignment', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${user.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            assignmentId: _id,
            TotalMarks: marks,
            title,
            examineEmail: user.email,
            examineName: user.displayName,
            docsLink: googleDocLink,
            note,
            status: "pending",
          }),
        });
      const data = await res.json();
      if (res.ok) {
        alert('Assignment submitted successfully!');
        setModalOpen(false);
        setGoogleDocLink('');
        setNote('');
      } else {
        alert('Submission failed: ' + data.message);
      }
    } catch (error) {
      alert('Error submitting assignment');
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  if (!assignment) return <div className="text-center mt-10 text-red-500">Loading assignment...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex items-center justify-center p-6">
      <div className="backdrop-blur-lg bg-white/80 border border-white/30 shadow-2xl rounded-3xl max-w-4xl w-full overflow-hidden">
        <div className="grid md:grid-cols-2">


          <div className="h-full w-full">
            <img src={thumbnail} alt={title} className="w-full h-full object-cover rounded-l-3xl" />
          </div>

          <div className="p-8 flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-extrabold text-gray-800">{title}</h1>
            <p className="text-gray-600 leading-relaxed text-md">{description}</p>

            <div className="flex gap-4 flex-wrap mt-2">
              <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium shadow">
                Marks: {marks}
              </span>
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium shadow ${difficulty === 'easy'
                  ? 'bg-green-100 text-green-700'
                  : difficulty === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-700'
                  }`}
              >
                Difficulty: {difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}
              </span>
            </div>
            {
              createdByEmail === user?.email ? 'my assignment' :
                <button

                  onClick={() => setModalOpen(true)}
                  className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Take assignment
                </button>
            }
          </div>
        </div>
      </div>
      {modalOpen && (
        <>
          <input type="checkbox" checked={modalOpen} readOnly className="modal-toggle" />
          <div className="modal modal-open backdrop-blur-md">
            <div className="modal-box max-w-md">
              <h3 className="font-bold text-lg">Submit Assignment</h3>
              <form onSubmit={submitAssignment} className="mt-4 space-y-4">
                <input
                  type="url"
                  placeholder="Google Docs Link"
                  value={googleDocLink}
                  onChange={(e) => setGoogleDocLink(e.target.value)}
                  required
                  className="input input-bordered w-full"
                />
                <textarea
                  placeholder="Quick Note (optional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={4}
                  className="textarea textarea-bordered w-full"
                ></textarea>
                <div className="modal-action">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
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
        </>
      )}
    </div>
  );
};

export default ViewAssignment;


