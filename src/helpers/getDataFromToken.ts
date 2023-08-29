import jwt from "jsonwebtoken";
import { NextRequest , NextResponse } from "next/server";

export function GetDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    console.log("token -> ", token);
    const jwtresp:any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    console.log("jwtresp -> ", jwtresp);
    return jwtresp;
  } catch (error: any) {
    console.log({ error: error.message });
  }
}
