"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
    fullName: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Signup Success");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0 &&
      user.fullName.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md  p-10 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {loading ? "Processing" : "Signup"}
        </h1>
        <label htmlFor="username" className="block mb-2 font-semibold">
          Username
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />
        <label htmlFor="fullName" className="block mb-2 font-semibold">
          Full Name
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="fullName"
          type="text"
          value={user.fullName}
          onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          placeholder="Full Name"
        />
        <label htmlFor="email" className="block mb-2 font-semibold">
          Email
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <label htmlFor="password" className="block mb-2 font-semibold">
          Password
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button
          onClick={onSignup}
          className={`w-full p-2 rounded-lg mb-4 text-white ${
            buttonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={buttonDisabled}
        >
          {loading ? "Processing..." : "Signup"}
        </button>
        <Link
          href="/login"
          className="text-blue-500 hover:underline text-center block mt-4"
        >
          Visit login page
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
