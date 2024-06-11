// pages/api/auth/login.js
import { connect } from "@/middlewares/connectDB";
import { NextResponse } from "next/server";

// Ensure database connection
connect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      NextResponse.clearCookie("refreshtoken", { path: "/auth/refereshtoken" });
    } catch (error) {
      next(error);
    }
  } else {
    NextResponse.status(405).json({ error: "Method not allowed" });
  }
}
