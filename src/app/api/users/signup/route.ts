import { connectDB } from "@/config/db.config";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

import becrypt from "bcryptjs";
import { sendEmail } from "@/utils/mailer";
import { EMAIL_TYPES } from "@/utils/constant";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    // console.log(reqBody);

    const { username, email, password, fullName } = reqBody;

    const user = await User.findOne({ email });

    // console.log(user);

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await becrypt.genSalt(10);
    const hashedPassword = await becrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      fullName,
    });

    // console.log("newUser :", newUser);

    // Send verification email
    await sendEmail({
      email,
      emailType: EMAIL_TYPES.VERIFY_EMAIL,
      userId: newUser._id,
    });

    const savedUser = await User.findById(newUser._id).select("-password");

    return NextResponse.json(
      {
        message: "User registered successfully and email send for verification",
        user: savedUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in signup route: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
