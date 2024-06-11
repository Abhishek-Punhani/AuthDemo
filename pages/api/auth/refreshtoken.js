// pages/api/auth/refreshtoken.js
import { connect } from "@/middlewares/connectDB";
import { generateToken, verifyToken } from "@/services/tokenServices";
import { findUser } from "@/services/authServices";
import createHttpError from "http-errors";
import { NextResponse } from "next/server";

// Ensure database connection
connect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const refresh_token = req.cookies.refreshtoken;
      if (!refresh_token) throw createHttpError.Unauthorized("Please login.");
      const check = await verifyToken(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET
      );
      const user = await findUser(check.userId);
      const access_token = await generateToken(
        { userId: user._id },
        "1d",
        process.env.ACCESS_TOKEN_SECRET
      );
      NextResponse.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          token: access_token,
        },
      });
    } catch (error) {
      next(error);
    }
  } else {
    NextResponse.status(405).json({ error: "Method not allowed" });
  }
}
