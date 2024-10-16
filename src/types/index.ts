import { z } from "zod";

export const RegisterUserSchema = z.object({
	fullName: z
		.string()
		.min(3, { message: "Full name must be at least 3 characters long" })
		.max(100, { message: "Full name must not exceed 100 characters" }),

	email: z.string().email({ message: "Please provide a valid email" }),

	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters long" }),
});

export const LoginUserSchema = z.object({
	email: z.string().email({ message: "Please provide a valid email" }),

	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters long" }),
});

export type RegisterUserType = z.infer<typeof RegisterUserSchema>;
export type LoginUserType = z.infer<typeof LoginUserSchema>;
