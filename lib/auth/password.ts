import bcrypt from "bcrypt";

/**
 * Hashes the raw password
 *
 * @param {string} password - The password to hash
 * @returns {Promise<string>} - The hashed password
 * */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

/**
 * Compares the equality of raw password and hashed password
 *
 * @param {string} password - The password to verify
 * @param {string} hashedPassword - The hashed password to compare with
 *
 * @returns {Promise<boolean>} - True if the password is correct
 * */
export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
