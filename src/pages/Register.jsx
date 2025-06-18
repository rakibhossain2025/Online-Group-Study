import React,{ useContext } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";


const Register = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, name, photo } = Object.fromEntries(
      formData.entries()
    );
    const errors = [];
    if (password.length < 6) errors.push("At least 6 characters.");
    if (!/[A-Z]/.test(password)) errors.push("One uppercase letter.");
    if (!/[a-z]/.test(password)) errors.push("One lowercase letter.");

    if (errors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        html: errors.join("<br/>"),
      });
      return;
    }

    createUser(email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Welcome!",
              text: "Your account is ready create successfully",
              timer: 2000,
              showConfirmButton: false,
              timerProgressBar: true,
            });
            navigate("/");
          })
          .catch((err) => console.log("Profile update error:", err));
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Something went wrong!",
        });
      });
  };

  const handleGoogleRegister = () => {
    googleSignIn()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Signed in with Google!",
          text: `Welcome, ${result.user.displayName}! 🎉`,
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed!",
          text: error.message || "Something went wrong!",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[500px] bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 border rounded-md text-black"
          />
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            required
            className="w-full px-4 py-3 border rounded-md text-black"
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            className="w-full px-4 py-3 border rounded-md text-black"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border rounded-md text-black"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm mb-2">Or register with</p>
          <button
            onClick={handleGoogleRegister}
            className="flex items-center justify-center gap-2 w-full py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-2xl" />
            <p className="text-sm font-medium text-gray-700">
              Continue with Google
            </p>
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
