import { connectDB } from "@/config/db.config";
import {User} from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import becrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { email, password } = reqBody;

    const user = await User.findOne({
      email,
    });

    // console.log("User: ", user);

    if (!user) {
      return NextResponse.json(
        {
          error: "User doesn't exist with the given mail",
        },
        { status: 404 }
      );
    }

    const isMatch = await becrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        { status: 400 }
      );
    }

    const tokenData = {
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    };

    const token = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { token, message: "User Successfully loggedin" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return response;
  } catch (error: any) {
    console.log("Error in login route: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
