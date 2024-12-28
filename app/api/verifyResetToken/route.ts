import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { token, password } = await request.json();

  // Validate input
  if (!token || !password) {
    return NextResponse.json(
      { error: "Token and password are required" },
      { status: 400 }
    );
  }

  try {
    // Define the time threshold (4.5 hours ago) for valid tokens
    const fourHoursAndThirtyMinutesAgo = new Date(
      Date.now() - 1000 * 60 * 60 * 4.5
    );

    // Find the password reset token in the database
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token,
        createdAt: {
          gt: fourHoursAndThirtyMinutesAgo,
        },
        resetAt: null, // Ensure the token has not already been used
      },
    });

    console.log("Retrieved reset token:", resetToken);

    // If the token is invalid or expired
    if (!resetToken) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { hashedPassword }, // Ensure the correct field is updated
    });

    // Mark the token as used by setting `resetAt` to the current timestamp
    await prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { resetAt: new Date() },
    });

    // Optionally, delete the token from the database to ensure it's removed
    await prisma.passwordResetToken.delete({
      where: { token },
    });

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Failed to reset password. Please try again later." },
      { status: 500 }
    );
  }
}
