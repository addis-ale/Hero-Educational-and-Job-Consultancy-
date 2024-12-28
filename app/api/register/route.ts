import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: { activateTokens: true },
    });

    if (existingUser) {
      if (existingUser.active) {
        return NextResponse.json(
          { error: "Email is already registered with an active account" },
          { status: 400 }
        );
      } else {
        const newToken = `${randomUUID()}${randomUUID()}`;
        const tokenExpiration = new Date();
        tokenExpiration.setHours(tokenExpiration.getHours() + 24);

        await prisma.activateToken.create({
          data: {
            token: newToken,
            userId: existingUser.id,
            expiresAt: tokenExpiration,
          },
        });

        try {
          await axios.post(`${process.env.BASE_URL}/api/sendToken`, {
            email: existingUser.email,
            token: newToken,
          });
        } catch (emailError) {
          console.error("Error sending email:", emailError);
          return NextResponse.json(
            { error: "Failed to send activation email." },
            { status: 500 }
          );
        }

        return NextResponse.json(
          { success: true, message: "A new activation email has been sent." },
          { status: 200 }
        );
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, hashedPassword, active: false },
    });

    const token = `${randomUUID()}${randomUUID()}`;
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 24);

    await prisma.activateToken.create({
      data: { token, userId: user.id, expiresAt: tokenExpiration },
    });

    try {
      await axios.post(`${process.env.BASE_URL}/api/sendToken`, {
        email: user.email,
        token,
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return NextResponse.json(
        { error: "Failed to send activation email." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Registration successful. Please activate your account via email.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
