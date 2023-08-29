"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { NextFetchEvent } from "next/server";
import { Router } from "next/router";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isButtonDisabled, setisButtonDisabled] = useState(true);
  const loginObj = { 0: "Login", 1: "Logging In", 2: "Logged In Successfully" };
  const [isLoggedIn, setisLoggedIn] = useState(loginObj[0]);
  // 0 :  , 1 : proessing

  async function onLogin(event: Event) {
    event.preventDefault();
    console.log("clicked login", user);
    setisLoggedIn(loginObj[1]);
    try {
      const resp: Record<string, string | number | boolean> = await axios.post(
        "api/users/login",
        user
      );
      console.log("client resp", resp);
      // @ts-ignorets-ignore
      if (!resp.data.success) {
        console.log("Wrong Username or Password");
        toast.error("Wrong Username or Password");
      }
      setisLoggedIn(loginObj[2]);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      setisLoggedIn(loginObj[0]);
      toast.error(error.message);
      console.log("error message ", error.message);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setisButtonDisabled(false);
    } else {
      setisButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center p-6 bg-slate-900 text-black">
      <h2 className="justify-center text-2xl font-bold">{isLoggedIn}</h2>
      <hr />
      <form className="flex flex-col gap-4 justify-center">
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
            className="p-2 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black"
            onClick={onLogin}
          >
            Login
          </button>
        </div>
        <Link
          href="/signup"
          className="cursor-pointer p-1 text-lg text-blue-200 text-center"
        >
          SignUp here
        </Link>
      </form>
    </div>
  );
}

// <div className='flex items-center justify-center h-screen bg-black text-white'>
//     <h2 className='p-4 px-20 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-900'>Login</h2>
//     </div>
