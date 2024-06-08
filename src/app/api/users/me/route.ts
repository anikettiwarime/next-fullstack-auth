import { connectDB } from "@/config/db.config";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.model";
import { getDataFromToken } from "@/utils/getDataFromToken";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const { user: currentUser } = await getDataFromToken(request);

    const user = await User.findById(currentUser.id).select("-password");

    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        user: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
