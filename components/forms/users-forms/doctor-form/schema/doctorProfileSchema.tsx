import validationRules from "@/utils/zodValidationRules";
import * as z from "zod";

const doctorProfileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  birth_date: z.date().refine((date) => date <= new Date(), {
    message: "Date cannot be in the future",
  }),
  gender: z.enum(["male", "female"]),
  phone: z.string().regex(/^\d{11}$/, "Phone number must be exactly 11 digits"),
  avatarFile: validationRules.image.optional(),
});

export default doctorProfileSchema;