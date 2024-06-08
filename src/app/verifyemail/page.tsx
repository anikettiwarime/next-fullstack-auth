"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <div className=" p-10 shadow-lg rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Verify Email</h1>
        <h2 className="p-2 bg-orange-500 text-black rounded mb-6">
          {token ? `${token}` : "no token"}
        </h2>

        {verified && (
          <div>
            <h2 className="text-2xl font-semibold text-green-500 mb-4">
              Email Verified
            </h2>
            <Link href="/login" className="text-blue-500 underline">
              Login
            </Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-2xl font-semibold bg-red-500 text-black p-2 rounded mb-4">
              Error
            </h2>
            <p className="">Verification failed. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
