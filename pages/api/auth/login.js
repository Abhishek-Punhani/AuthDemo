// pages/api/auth/login.js
import { connect } from "@/middlewares/connectDB";
import { signUser } from "@/services/authServices";
import { generateToken } from "@/services/tokenServices";
import { NextResponse } from "next/server";

// Ensure database connection
connect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const user = await signUser(email, password);
      const access_token = await generateToken(
        { userId: user._id },
        "1d",
        process.env.ACCESS_TOKEN_SECRET
      );
      const refresh_token = await generateToken(
        { userId: user._id },
        "30d",
        process.env.REFRESH_TOKEN_SECRET
      );

      NextResponse.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/auth/refreshtoken",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
      });

      NextResponse.json({
        message: "register success.",
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
