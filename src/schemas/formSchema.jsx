"use client";

import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).min(5, { message: "Email must be at least 5 characters long" }).max(50, { message: "Email must be at most 50 characters long" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(50, { message: "Password must be at most 50 characters long" }).regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }).regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }).regex(/[0-9]/, { message: "Password must contain at least one number" }).regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
});
export default formSchema