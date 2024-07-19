import * as z from "zod";

const patientAddtionalInfoSchema = z.object({
  allergic_reactions:z.string().min(5,"at least 5 characters"),
  notes: z.string().min(5, "at least 5 characters"),
  weight: z.coerce.number().min(0, "Weight is required"),
  height: z.coerce.number().min(0, "Height is required"),
});

export default patientAddtionalInfoSchema;