import { use } from 'react';
import { SessionOptions } from "iron-session";

// export const sessionOptions: SessionOptions = {
//   password: "complex_password_at_least_32_characters_long",
//   cookieName: "BMSESSIONID",
//   cookieOptions: {
//     // secure only works in `https` environments
//     // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
//     secure: false,
//   },
// };

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}