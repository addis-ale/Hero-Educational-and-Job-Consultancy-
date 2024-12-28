import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { randomUUID } from "crypto";
import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;
  if (!email) {
    return NextResponse.json({ error: "Invalid Email" }, { status: 400 });
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return NextResponse.json(
      { error: "This email is not registered" },
      { status: 404 }
    );
  }
  const token = await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
      resetAt: null,
    },
  });
  try {
    await axios.post(`${process.env.BASE_URL}/api/sendResetToken`, {
      email,
      token: token.token,
    });
    return NextResponse.json(
      {
        message: "successfully sent the email",
      },
      { status: 200 }
    );
  } catch (emailError) {
    console.error("Error sending email:", emailError);
    return NextResponse.json(
      { error: "Failed to send reset  email." },
      { status: 500 }
    );
  }
}
