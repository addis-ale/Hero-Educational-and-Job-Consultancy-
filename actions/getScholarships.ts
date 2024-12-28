import prisma from "@/libs/prismadb";

export async function getScholarships() {
  try {
    const allscholarships = await prisma.scholarship.findMany();

    return allscholarships;
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    return []; // Return an empty array in case of an error
  }
}
