import mongoose from "mongoose";
import User from "@/models/userModel";
import { Connect } from "@/app/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/helpers/mailer";

Connect();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { username, email, password } = reqbody;
    console.log("reqbody", reqbody);
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User Already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    console.log(salt);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    const mailresp = await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });
    // send verification email

    // if(mailresp){
    //   console.log("mail sent succesfully")
    // }

    return NextResponse.json({
      message: "User Created Successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
