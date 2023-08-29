//import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {

    const reqbody = await request.json();

    const {logout} = reqbody;

    if(!logout){
        console.log("Wrong Request");
        return NextResponse.json(
            { message: "Wrong Request" , logout : false}
          )
    }

    const response = NextResponse.json(
        { message: "Log out Successfully" , logout : true}
      );
    
    // response.cookies.delete("token");

    response.cookies.set("token" , "");

    return response;

}



