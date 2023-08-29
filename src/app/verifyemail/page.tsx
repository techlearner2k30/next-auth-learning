'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function VerifyEmail({ searchParams }: { searchParams: { token: string } }) {
  const token = searchParams.token;
  console.log("dsdd" , searchParams.token);

  const [isVerified, setisVerified] = useState(false);

  useEffect(() => {
    async function verifyUserToken() {
      const resp = await axios.post("/api/users/verify", { token: token });
      return resp;
    }

    try {
      const resp: any = verifyUserToken();
      if (!resp.success) {
        toast.error("response no verified");
        console.log("response no verified");
      }
      setisVerified(resp.success);
    } catch (error: any) {
      toast.error(error);
      console.log("verify error ", error);
      setisVerified(false);
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center bg-slate-400">
      <h2 className="text-white text-2xl">
        {isVerified ? (
          <span className="bg-green pt-2 px-4 ">
            {" "}
            You are now verified. you can now vist your profile page
          </span>
        ) : (
          <span className="bg-red pt-2 px-4 ">
            {" "}
            Something not Correct. try again. unable to verify.
          </span>
        )}
      </h2>
    </div>
  );
}

export default VerifyEmail;
