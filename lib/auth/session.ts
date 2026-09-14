"use server";

import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) throw new Error("JWT_SECRET is not defined");
const encodedKey = new TextEncoder().encode(SECRET_KEY);

/**
 * Encrypts the payload of the session token and returns the signed JWT
 *
 * @param {JWTPayload} payload - The payload to encrypt
 * @returns {Promise<string>}
 */
async function encrypt(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(encodedKey);
}

/**
 * Decrypts the session token and returns the payload
 *
 * @param {string} token - The token to decrypt
 * @returns {Promise<JWTPayload | null>}
 */
async function decrypt(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Creates a new session and sets it in the cookies
 *
 * @param {string} userId - The id of the current user
 * @returns {Promise<void>}
 */
export async function createSession(userId: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ userId });

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

/**
 * Deletes the current session from cookies
 *
 * @returns {Promise<void>}
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

/**
 * Get the current sessio from the cookies
 *
 * @returns {Promise<JWTPayload | null>}
 * */
export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) return null;
  return await decrypt(session.value);
}
