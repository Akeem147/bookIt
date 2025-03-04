"use server";

import { createSessionClient } from "../../config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";

// Async function to get all rooms
async function getMyRooms() {
  const sessionCookie = await cookies().get("appwrite-session"); 
  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const { account, databases } = await createSessionClient(
      sessionCookie.value
    );
    const user = await account.get();
    const userId = user.$id;

    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_ROOMS,
      [Query.equal("user_id", userId)]
    );

    return rooms;
  } catch (error) {
    console.log("Failed to get user room", error);
    redirect("/error");
  }
}

export default getMyRooms