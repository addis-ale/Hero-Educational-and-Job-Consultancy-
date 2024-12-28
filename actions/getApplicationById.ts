import prisma from "@/libs/prismadb";

interface IParams {
  applicationId?: string; // Keep it as optional
}

export async function getApplicationById({ applicationId }: IParams) {
  if (!applicationId) {
    return null; // Handle the case where applicationId is undefined
  }

  try {
    const application = await prisma.application.findUnique({
      where: {
        id: applicationId,
      },
    });

    return application || null;
  } catch (error) {
    console.error("Error fetching application by ID:", error);
    throw new Error("Failed to fetch application");
  }
}
