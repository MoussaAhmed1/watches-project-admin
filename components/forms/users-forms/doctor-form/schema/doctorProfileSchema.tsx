import validationRules from "@/utils/zodValidationRules";
import * as z from "zod";

const doctorProfileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  birth_date: validationRules.date,
  gender: z.enum(["male", "female"]),
  phone: validationRules.phone,
  avatarFile: validationRules.image.optional(),
});

export default doctorProfileSchema;