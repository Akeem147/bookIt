"use server";
import { createSessionClient } from "../../config/appwrite";
import { cookies } from "next/headers";

async function destroySession() {
  const sessionCokie = cookies().get("appwrite-session");
  if (!sessionCokie) {
    return {
      error: "No session cookie found!",
    };
  }
  try {
    const { account } = await createSessionClient(sessionCokie.value);
    await account.deleteSession("current");
    cookies().delete("appwrite-session");

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Error deleting session",
    };
  }
}

export default destroySession;
