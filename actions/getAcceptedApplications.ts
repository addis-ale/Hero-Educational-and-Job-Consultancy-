import prisma from "@/libs/prismadb";
export async function getAcceptedApplications() {
  try {
    const acceptedApplications = await prisma.application.findMany({
      where: {
        status: "accepted",
      },
    });
    return acceptedApplications;
  } catch (error) {
    console.log(error);
    return [];
  }
}
