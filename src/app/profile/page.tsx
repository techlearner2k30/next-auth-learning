"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [userID, setUserID] = useState("na");

  async function getData() {
    try {
      const userData = await axios.get("/api/users/userData");
      console.log("getData profiel page response ", userData);
      setUserID(userData.data.userDataFromDb._id);
    } catch (error: any) {
      console.log({ error: error.message });
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col justify-center min-h-screen bg-black text-white items-center gap-4">
      <h2 className="text-3xl">Profile</h2>
      <p> {userID ? (<Link className="bg-green-800 py-2 p-4 rounded-3xl" href={`/profile/${userID}`}>click : {userID}</Link>) : "Not Found"} </p>
    </div>
  );
}
