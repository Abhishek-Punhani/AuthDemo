import { connect } from "@/middlewares/connectDB";
import { NextResponse } from "next/server";
import { createUser } from "@/services/authServices";
import { generateToken } from "@/services/tokenServices";
import { json } from "micro"; // Add micro for handling JSON request body

// Ensure database connection
await connect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Parse JSON body from the request
      const body = await json(req);
      const { name, email, picture, password } = body;
      console.log(body);
      // Create new user
      const newUser = await createUser({
        name,
        email,
        picture,
        password,
      });

      // Generate tokens
      const access_token = await generateToken(
        { userId: newUser._id },
        "1d",
        process.env.ACCESS_TOKEN_SECRET
      );
      const refresh_token = await generateToken(
        { userId: newUser._id },
        "30d",
        process.env.REFRESH_TOKEN_SECRET
      );

      // Set refresh token in the cookie
      NextResponse.setHeader(
        "Set-Cookie",
        `refreshtoken=${refresh_token}; HttpOnly; Path=/api/auth/refreshtoken; Max-Age=${
          30 * 24 * 60 * 60
        }`
      );

      // Send JSON response
      NextResponse.status(200).json({
        message: "register success.",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          picture: newUser.picture,
          token: access_token,
        },
      });
    } catch (error) {
      console.error("Error during registration:", error);
      NextResponse.status(500).json({ error: "Internal server error" });
    }
  } else {
    NextResponse.status(405).json({ error: "Method not allowed" });
  }
}
