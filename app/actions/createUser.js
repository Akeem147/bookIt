"use server";
import { ID } from "node-appwrite";
import { createAdminClient } from "../../config/appwrite";

async function createUser(previousState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");

  if (!name || !email || !password) {
    return {
      error: "Please fill all fields.",
    };
  }

  if (password.length < 6) {
    return {
      error: "Password must be at least 6 characters long",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Password does not match",
    };
  }

  const { account } = await createAdminClient();

  try {
    await account.create(ID.unique(), email, password, name);
    return {
      success: true,
    };
  } catch (error) {
    console.log("Registration error", error);
    return {
      error: "Could not register user",
    };
  }
}

export default createUser;
