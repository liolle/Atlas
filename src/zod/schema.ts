import * as z from "zod";

const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Required")
});

const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Required 8 characters"),
    name: z
        .string()
        .min(4, "Required 4")
        .max(20, "Name to big")
        .refine((value) => value.trim() !== "", {
            message: "Cant contain spaces"
        })
});

export { SignInSchema, SignUpSchema };
