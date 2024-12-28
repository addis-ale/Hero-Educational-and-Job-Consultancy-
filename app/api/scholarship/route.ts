import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();
    console.log("Current User:", currentUser);

    // Check if the user is an admin
    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only Admin can add Scholarship" },
        { status: 403 }
      );
    }

    // Parse the request body
    const body = await request.json();
    console.log("Request Body:", body);

    const {
      name,
      sch_title,
      sch_introduction,
      job_title,
      job_introduction,
      card_url,
      flag_url,
    } = body;

    // Validate required fields
    if (
      !name ||
      !sch_title ||
      !sch_introduction ||
      !job_title ||
      !job_introduction ||
      !flag_url ||
      !card_url
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a new scholarship record
    const scholarship = await prisma.scholarship.create({
      data: {
        name,
        sch_title,
        sch_introduction,
        job_title,
        job_introduction,
        flag_url,
        card_url,
      },
    });
    // Return the created scholarship
    return NextResponse.json(scholarship, { status: 201 });
  } catch (error) {
    console.error("Error creating scholarship:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the scholarship" },
      { status: 500 }
    );
  }
}
