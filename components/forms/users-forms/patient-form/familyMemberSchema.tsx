import validationRules from "@/utils/zodValidationRules";
import * as z from "zod";

const FamilymemberSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  birth_date: validationRules.date,
  gender: z.enum(["male", "female"]),
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
  allergic_reactions:z.string().min(5,"at least 5 characters").optional(),
  notes: z.string().min(5, "at least 5 characters").optional(),
  weight: z.coerce.number().min(0, "Weight is required").optional(),
  height: z.coerce.number().min(0, "Height is required").optional(),
  kinship: z.enum([
    'Parent',
    'Child',
    'Sibling',
    'Spouse',
    'Grandparent',
    'Grandchild',
    'UncleAunt',
    'NieceNephew',
    'Cousin',
    'Other'
  ], {
    required_error: "Kinship is required"
  }),
  kinship_ifOther: z.string().min(1, "Kinship is required").optional(),
});

export default FamilymemberSchema;