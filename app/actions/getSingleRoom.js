"use server";

import { createAdminClient } from "../../config/appwrite";

import { redirect } from "next/navigation";

// Async function to get all rooms
export async function getSingleRoom(id) {
  try {
    const { databases } = await createAdminClient();
    const room = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_ROOMS,
      id
    );

    return room;
  } catch (error) {
    console.log('Failed to get room', error);
    redirect('/error');
  }
}

// Async function to trigger revalidation (must be called separately)
// export async function revalidateHome() {
//   // This should not be called during render!
//   revalidatePath("/", "layout");
// }
