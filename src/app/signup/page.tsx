"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setisLoading] = useState(false);

  const [isButtonDisabled, setisButtonDisabled] = useState(false);

  async function onSignUp() {
    setisButtonDisabled(true);
    try {
      setisLoading(true);
      const response = await axios.post("/api/users/signup" , user);
      console.log("SIgn Up Success" , response);
      router.push('/login');
    } catch (error:any) {
      console.log(error)
      toast.error(error.message);
      setisButtonDisabled(false);
    }finally{
      setisLoading(false);
    }
  }

  useEffect( ()=>{
    if(user.username.length > 0 && user.password.length > 0 && user.email.length > 0){
      setisButtonDisabled(false);
    }else{
      setisButtonDisabled(true);
    }
  },[user])

  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center p-6 bg-slate-500 text-white">
      <h2 className="justify-center text-2xl font-bold">{!isLoading ? "SignUp" : "Processing"}</h2>
      <hr />
      <form className="flex flex-col gap-4 justify-center text-black">
        <div className="flex w-full justify-between gap-2 ">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="rounded-lg p-2 border-zinc-100"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
          />
        </div>
        <div className="flex w-full justify-between gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="rounded-lg p-2 border-zinc-100"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
          />
        </div>
        <div className="flex w-full justify-between gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="rounded-lg p-2 border-zinc-100"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />
        </div>
        <div className=" flex justify-center text-center items-center">
          <button
            className="p-2 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-black text-white hover:bg-slate-600 disabled:bg-slate-100 disabled:text-black disabled:opacity-5"
            disabled={isButtonDisabled}
            onClick={onSignUp}
          >
            Sign Up Here
          </button>
        </div>
        <Link
          href="/login"
          className="cursor-pointer p-1 text-lg text-blue-200 text-center"
        >
          login here
        </Link>
      </form>
    </div>
  );
}
