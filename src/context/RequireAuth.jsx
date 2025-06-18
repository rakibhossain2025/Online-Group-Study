import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const RequireAuth = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const navigate = useNavigate()
  const [go, setGo] = useState(false)
  useEffect(() => {
    if (!user && !loading) {
      Swal.fire({
        title: "Login For See",
        allowOutsideClick: false,
        confirmButtonText: "Go",
      }).then((result) => {
        if (result.isConfirmed) {
          setGo(true)
        }
      });
      return
    }
  }, [user, loading])


  if (go && !user) {
    return navigate('/login')
  }
  if (!user) {
    return <div className="min-h-screen bg-gray-950/30"></div>
  }
  return children
};

export default RequireAuth;


