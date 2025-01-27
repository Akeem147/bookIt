"use server";

import { createAdminClient } from "../../config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Async function to get all rooms
export async function getAllRooms() {
  try {
    const { databases } = await createAdminClient();
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_ROOMS
    );

    return rooms;
  } catch (error) {
    console.log('Failed to get room', error);
    redirect('/error');
  }
}

// Async function to trigger revalidation (must be called separately)
export async function revalidateHome() {
  // This should not be called during render!
  revalidatePath("/", "layout");
}
