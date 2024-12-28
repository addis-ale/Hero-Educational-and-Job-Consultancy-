import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

// Activation endpoint
export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    console.log("Received token:", token);

    // Find the activation token, including the related user
    const activateToken = await prisma.activateToken.findUnique({
      where: { token },
      include: { user: true },
    });

    // Validate the token existence
    if (!activateToken) {
      return NextResponse.json(
        { success: false, message: "Invalid token." },
        { status: 400 }
      );
    }

    // Check if the token has already been used
    if (activateToken.activatedAt) {
      return NextResponse.json(
        { success: false, message: "Token has already been used." },
        { status: 400 }
      );
    }

    // Verify if the token is expired or expiration date is missing
    const now = new Date();
    if (!activateToken.expiresAt || activateToken.expiresAt < now) {
      return NextResponse.json(
        { success: false, message: "Token has expired." },
        { status: 400 }
      );
    }

    // Activate the user's account
    await prisma.user.update({
      where: { id: activateToken.userId },
      data: { active: true },
    });

    // Mark the token as used
    await prisma.activateToken.update({
      where: { token },
      data: { activatedAt: new Date() },
    });

    // Delete the token after marking it as activated
    await prisma.activateToken.delete({
      where: { token },
    });

    console.log("Account activated successfully for user:", activateToken.user);

    return NextResponse.json(
      { success: true, message: "Account activated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during activation:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
