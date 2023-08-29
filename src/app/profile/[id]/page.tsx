"use client";
import { POST } from "@/app/api/users/login/route";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ProfileId({ params }: { params: { id: string } }) {
  console.log(params);

  const router = useRouter();

  async function logout(event: any) {
    event.preventDefault();
    // console.log("clicked logout");
    try {
      const logoutObj = { logout: true };
      const resp = await axios.post("/api/users/logout", logoutObj);
      console.log("logout", resp);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex flex-col justify-center min-h-screen bg-black text-white items-center gap-4">
      <h2 className="text-3xl">Profile Page</h2>
      <p className="p-2 bg-slate-200 text-black rounded-xl"> {params.id}</p>
      <button
        className="rounded-full py-2 px-8 bg-red-500 mt-4 mx-auto"
        onClick={logout}
      >
        {" "}
        LogOut
      </button>
    </div>
  );
}
