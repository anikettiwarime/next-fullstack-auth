import { connectDB } from "@/config/db.config";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { token } = reqBody;

    // console.log("Token: ", token);

    const user = await User.findOne({
      verifyEmailToken: token,
      verifyEmailTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Token is invalid or has expired." },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verifyEmailToken = undefined;
    user.verifyEmailTokenExpires = undefined;

    await user.save();

    return NextResponse.json({ message: "Email verified successfully." });
  } catch (error: any) {
    console.error("Error in verifyEmail route: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
