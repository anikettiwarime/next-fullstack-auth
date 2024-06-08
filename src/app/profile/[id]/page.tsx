"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const UserProfile = ({ params }: any) => {
  const { id } = params;

  const [user, setUser] = useState<any>({});

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setUser(res.data.user);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 ">
      <div className=" p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">User Profile</h1>
        <hr className="mb-4" />
        <div className="text-left">
          <p className="text-xl mb-2">Profile ID:</p>
          <span className="block p-2 mb-4 rounded bg-orange-500 text-white text-lg">
            {id}
          </span>

          <p className="text-lg mb-1">
            <strong>Full Name:</strong> {user.fullName}
          </p>
          <p className="text-lg mb-1">
            <strong>Username:</strong> {user.username}
          </p>
          <p className="text-lg mb-1">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-lg mb-1">
            <strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}
          </p>
          <p className="text-lg mb-1">
            <strong>Verified:</strong> {user.isVerified ? "Yes" : "No"}
          </p>
          <p className="text-lg mb-1">
            <strong>Created At:</strong>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </p>
          <p className="text-lg">
            <strong>Updated At:</strong>{" "}
            {new Date(user.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
