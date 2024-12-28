import prisma from "@/libs/prismadb";

export async function getApplicationByCurrentUser(userId: string) {
  try {
    const myapplication = await prisma.application.findMany({
      where: {
        userId: userId,
      },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    // Return the fetched application data
    if (!myapplication) return null;
    return myapplication; // This was missing
  } catch (error) {
    console.log(error);
    return null; // Optionally return null in case of an error
  }
}
