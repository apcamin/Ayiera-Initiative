"use client";

import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).min(5, { message: "Email must be at least 5 characters long" }).max(50, { message: "Email must be at most 50 characters long" }),
  password: z.string().min(4, { message: "Password must be at least 4 characters long" }).max(50, { message: "Password must be at most 50 characters long" }),
});
export default formSchema