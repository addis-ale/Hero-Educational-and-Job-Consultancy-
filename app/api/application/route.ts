import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const body = await request.json();
  const {
    fullName,
    email,
    phoneNumber,
    type,
    field,
    status,
    passportImage,
    destination,
    birthCerteficateImage,
    educationalBackground,
  } = body;

  // Create application associated with the current user
  const application = await prisma.application.create({
    data: {
      fullName,
      email,
      phoneNumber,
      type,
      status,
      destination,
      field,
      passportImage,
      birthCerteficateImage,
      educationalBackground,
      userId: currentUser.id, // Link the application to the current user
    },
  });

  return NextResponse.json(application);
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  if (currentUser.role !== "ADMIN") return NextResponse.error();

  // You need to await request.json() as it returns a promise
  const body = await request.json();
  const { id, status } = body;

  const application = await prisma.application.update({
    where: { id: id },
    data: { status: status },
  });

  return NextResponse.json(application);
}
