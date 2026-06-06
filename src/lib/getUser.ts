import { cookies } from "next/headers";
import { verifyUserToken } from "./userAuth";


export async function getUser() {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get("token")
      ?.value;

  if (!token) {
    return null;
  }

  try {
    return verifyUserToken(token);
  } catch {
    return null;
  }
}