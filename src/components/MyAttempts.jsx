import { useContext, useEffect, useState } from "react";
import MyAttemptsCard from "./MyAttemptsCard";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const MyAttempts = () => {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const { user } = useContext(AuthContext);
  useEffect(() => {
    setToken(user?.accessToken)
    setEmail(user?.email)
  }, [user])
  useEffect(() => {
    axios.get(`http://localhost:2002/my-assignment/?email=${email}`,
      { headers: { Authorization: `Bearer ${token}`, } })
      .then((data) => setData(data.data));
  }, [email, token]);

  return (<>
    {
      data.length > 0 ?
        <div className="p-6 min-h-screen bg-gradient-to-r from-blue-50 via-purple-100 to-pink-50" >
          <h2 className="text-3xl font-bold mb-6 text-center">My Assignment Attempts</h2>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className="bg-base-200">
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Total Marks</th>
                  <th>Obtained</th>
                  <th>Feedback</th>
                  <th>Examiner</th>
                </tr>
              </thead>
              <tbody>
                {data.map((dt) => (
                  <MyAttemptsCard key={dt._id} dt={dt} />
                ))}
              </tbody>
            </table>
          </div>
        </div >
        : ""
    }
  </>
  );
};

export default MyAttempts;
