import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"; // Adjust the import based on your setup
import { getCurrentUser } from "@/actions/getCurrentUser"; // Adjust based on your auth setup

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json(); // Parse the incoming JSON body
  const currentUser = await getCurrentUser();

  // Check if the user is authenticated and has the ADMIN role
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }
  const {
    name,
    sch_title,
    sch_introduction,
    job_title,
    job_introduction,
    flag_url,
    card_url,
  } = body;

  try {
    // Update the scholarship in the database
    const updatedScholarship = await prisma.scholarship.update({
      where: { id: params.id }, // Use the ID from the URL
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

    // Return the updated scholarship
    return NextResponse.json(updatedScholarship, { status: 200 });
  } catch (error) {
    console.error("Failed to update scholarship:", error);
    return NextResponse.json(
      { message: "Failed to update scholarship" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();

  // Check if the user is authenticated and has the ADMIN role
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  try {
    // Delete the scholarship from the database
    await prisma.scholarship.delete({
      where: { id: params.id }, // Use the ID from the URL
    });

    // Return a success message
    return NextResponse.json(
      { message: "Scholarship successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete scholarship:", error);
    return NextResponse.json(
      { message: "Failed to delete scholarship" },
      { status: 500 }
    );
  }
}
