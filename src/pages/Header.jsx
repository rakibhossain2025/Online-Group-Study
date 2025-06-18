import React, { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router";

const Header = () => {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Swal.fire({
          title: "Logged out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Failed to log out. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">

        <h2 className="flex items-center gap-2">
          <img src="https://www.shutterstock.com/image-vector/creative-modern-img-letter-logo-260nw-1780496255.jpg" alt="logo" className="w-10 h-10 rounded-full" />
          <span className="text-2xl font-bold text-blue-700"></span>
        </h2>


        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <nav className="hidden md:flex gap-6 text-gray-700 font-medium items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative group transition duration-300 hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""
              }`
            }
          >
            Home
            <span className="absolute left-0 -bottom-1 h-0.5 bg-blue-600 w-full"></span>
          </NavLink>

          <NavLink
            to="/assignments"
            className={({ isActive }) =>
              `relative group transition duration-300 hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""
              }`
            }
          >
            Assignments
            <span className="absolute left-0 -bottom-1 h-0.5 bg-blue-600 w-full"></span>
          </NavLink>

          {user && (
            <NavLink
              to="/pending-assignment"
              className={({ isActive }) =>
                `relative group transition duration-300 hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""
                }`
              }
            >
              Pending Assignments
              <span className="absolute left-0 -bottom-1 h-0.5 bg-blue-600 w-full"></span>
            </NavLink>
          )}
        </nav>

        <div className="hidden md:block">
          {user ? (
            <div className="group relative cursor-pointer inline-block">
              <img
                src={user.photoURL || "https://i.ibb.co/4Zg2z2M/user.png"}
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-blue-500"
              />
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-50">
                <p className="px-4 py-2 text-sm text-gray-700 font-semibold border-b">
                  {user.displayName || "Unknown User"}
                </p>

                <Link
                  to="/create-assignment"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Create Assignments
                </Link>
                <Link
                  to="/my-attempts"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Attempted Assignments
                </Link>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/login">
                <button className="btn btn-outline btn-primary px-6">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="btn btn-outline btn-primary px-6">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-4 shadow-lg">
          <nav className="flex flex-col gap-3 text-gray-700 font-medium">
            <NavLink
              to="/assignments"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `px-2 py-1 rounded hover:bg-blue-50 ${isActive ? "text-blue-600 font-semibold" : ""
                }`
              }
            >
              Assignments
            </NavLink>

            {user && (
              <NavLink
                to="/pending-assignment"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `px-2 py-1 rounded hover:bg-blue-50 ${isActive ? "text-blue-600 font-semibold" : ""
                  }`
                }
              >
                Pending Assignments
              </NavLink>
            )}
          </nav>

          <div>
            {user ? (
              <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL || "https://i.ibb.co/4Zg2z2M/user.png"}
                    alt="user"
                    className="w-10 h-10 rounded-full border"
                  />
                  <p className="text-gray-700 text-sm font-medium">
                    {user.displayName || "Unknown User"}
                  </p>
                </div>
                <Link
                  to="/create-assignments"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  Create Assignments
                </Link>
                <Link
                  to="/my-attempts"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  My Attempted Assignments
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-sm text-red-500 px-4 py-2 text-left hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2 mt-4">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="btn btn-outline btn-primary w-full">
                    Login
                  </button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <button className="btn btn-outline btn-primary w-full">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
