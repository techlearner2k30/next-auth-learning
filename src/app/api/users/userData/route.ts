import { Connect } from "@/app/dbConfig/dbConfig";
import { GetDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest , NextResponse } from "next/server";

Connect();

export async function GET(request:NextRequest){
    try {
        //const req = await request.json();
        console.log("get req userdata => " , request)
        const jwtData = await GetDataFromToken(request);
        const userDataFromDb = await User.findOne({_id:jwtData.id}).select("-password -isAdmin")
        console.log("userDataFromDb => " , userDataFromDb)
        return NextResponse.json({
            message : "userFound",
            userDataFromDb
        })
    } catch (error:any) {
        return NextResponse.json({error})
    }
}
