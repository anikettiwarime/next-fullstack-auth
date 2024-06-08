import { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

export function getDataFromToken(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      throw new Error("Token not found");
    }

    const decodedToken: any = jwt.verify(token, process.env.JWT_TOKEN_SECRET!);

    return decodedToken;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
