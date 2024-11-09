import validationRules from "@/utils/zodValidationRules";
import * as z from "zod";

const ProfileSchema = z.object({
  name : z.string().min(1, "Full name is required"),
  birth_date: validationRules.date,
  gender: z.enum(["male", "female"]),
  phone: validationRules.phone,
  avatarFile: validationRules.image.optional(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" }).optional()
});

export default ProfileSchema;