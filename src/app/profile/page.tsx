"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.user._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 ">
      <div className="w-full max-w-md  p-10 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
        <p className="mb-4 text-center">Profile page</p>
        <div className="p-2 rounded bg-green-500 text-center text-white mb-4">
          {data === "nothing" ? (
            "Nothing"
          ) : (
            <Link href={`/profile/${data}`} className="underline">
              {data}
            </Link>
          )}
        </div>
        <button
          onClick={logout}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Logout
        </button>
        <button
          onClick={getUserDetails}
          className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
        >
          Get User Details
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
