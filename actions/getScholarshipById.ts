import prisma from "@/libs/prismadb"; // Import the Prisma client instance
import { Scholarship } from "@prisma/client"; // Import the Scholarship type

export interface IScholarshipByIdParams {
  scholarshipId: string; // Ensure it's a string to match your ObjectId
}

export async function getScholarshipById(
  params: IScholarshipByIdParams
): Promise<Scholarship | null> {
  const { scholarshipId } = params;

  try {
    const scholarship = await prisma.scholarship.findUnique({
      where: { id: scholarshipId },
    });

    return scholarship;
  } catch (error) {
    console.error("Error fetching scholarship by ID:", error);
    throw new Error("Failed to retrieve scholarship");
  }
}
