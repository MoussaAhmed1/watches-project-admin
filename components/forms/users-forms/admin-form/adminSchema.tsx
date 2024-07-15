import validationRules from "@/utils/zodValidationRules";
import * as z from "zod";

const adminSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  birth_date: validationRules.date,
  gender: z.enum(["male", "female"]),
  phone: validationRules.phone,
  avatarFile: z.union([
    z.any().refine((file): file is File => file instanceof File, {
      message: 'File must be uploaded',
    }).refine(
      (file) => file && ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(file.type),
      {
        message: 'File must be an image (jpeg, png, gif)',
      }
    ),
    z.string().refine((url) => {
      try {
        const { pathname } = new URL(url);
        const extension = pathname.split('.').pop();
        return ['jpeg', 'jpg', 'png', 'gif', 'svg'].includes(extension?.toLowerCase() ?? '');
      } catch (error) {
        return false;
      }
    }, {
      message: 'String must be a valid image URL (jpeg, png, gif)',
    })
  ]).optional(),
  role: z.enum(["ADMIN"]),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" }),
  premessions:z.array(z.string())
});

export default adminSchema;