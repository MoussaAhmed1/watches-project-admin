import validationRules from "@/utils/zodValidationRules";
import * as z from "zod";

const ProfileSchema = z.object({
  birth_date: validationRules.date,
  gender: z.enum(["male", "female"]),
  phone: validationRules.phone,
  avatarFile: validationRules.image.optional(),
});

export default ProfileSchema;