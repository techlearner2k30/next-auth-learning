import mongoose from "mongoose";
import User from "@/models/userModel";
import { Connect } from "@/app/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

Connect();

export async function POST(request: NextRequest) {
  try {
    const reqbody = request.json();
    const { email, password } = await reqbody;
    console.log("login-", "post-", "reqbody =>", reqbody);
    const user = await User.findOne({ email });
    console.log("login-", "post-", "user =>", user);
    // check if user exists
    if (!user) {
      return NextResponse.json(
        { error: "User Does not exist" },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password,user.password);

    if (!validPassword) {
        return NextResponse.json(
          { error: "Wrong Password" },
          { status: 400 }
        );
      }

      // create token data

      const tokenData = {
        id : user._id,
        username : user.username,
        email : user.email
      }

      // create token

      const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, { expiresIn: "1d" })

      const response = NextResponse.json(
        { message: "Logged in Successfully" , success : true}
      );
      response.cookies.set("token" , token , {
        httpOnly : true,
      })

      return response;

      
    //   return NextResponse.json(
    //     { Success: "Logged in Successfully" , token : jwtToken },
    //     { status: 200 },
    //     {payload : user}
        
    //   );

    // const salt = await bcryptjs.genSalt(10);
    // const hashedPassword = await bcryptjs.hash(password, salt);

    // User.findOne({ email, hashedPassword });

    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
