import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email or password is missing.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "User with email already exists.",
        },
        { status: 400 }
      );
    }

    await User.create({ email, password });

    return NextResponse.json(
      {
        message: "User registered successfully.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: `Something went wrong while registering user ${error.message}`,
      },
      { status: 500 }
    );
  }
}
