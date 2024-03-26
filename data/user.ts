import { db } from "@/lib/db";

export  async function getUserByEmail(email: string) {
  try {
    const isUniqueUser = db.user.findUnique({ where: { email } });
    return isUniqueUser;
  } catch (error) {
    return null;
  }
}
export  async function getUserById(id: string) {
  try {
    const isUniqueUser = db.user.findUnique({ where: { id } });
    return isUniqueUser;
  } catch (error) {
    return null;
  }
}
