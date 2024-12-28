import { getCurrentUser } from "./getCurrentUser";
import prisma from "@/libs/prismadb";
export async function getAllApplications() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser?.role !== "ADMIN") return null;
  try {
    const allApplication = await prisma.application.findMany();
    return allApplication;
  } catch (error) {
    console.log(error);
    return [];
  }
}
