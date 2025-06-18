import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Logged in successfully 🎉",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Something went wrong!",
        });
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        console.log("Google Login Success:", result.user);
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Logged in with Google 🎉",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Google Login Error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Google Sign In Failed!",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[500px] bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-black"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-black"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="my-4 flex items-center">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-2xl" />
          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
