import validationRules from "@/utils/zodValidationRules";
import * as z from "zod";

const pharmacySchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  birth_date: validationRules.date,
  gender: z.enum(["male", "female"]),
  phone: validationRules.phone,
  avatarFile: validationRules.image.optional(),
  role: z.literal("PHARMACY"),
  ph_name: z.string().min(2, "First name is required"),
  address: z.string().min(2, "This field is required"),
  latitude: validationRules.latLng,
  longitude: validationRules.latLng,
  close_time: z.string().min(1, "Close time is required"),
  open_time: z.string().min(1, "Open time is required"),
  logo_images: validationRules?.image.optional(),
  summery: z.string().min(15, "at least 15 characters"),
  expierence: z.coerce.number().min(0, "Year of experience is required"),
  license_images: validationRules.images.optional(),
  categories: z.array(z.string()).min(1, 'Must have at least one category'),
});

export default pharmacySchema;


export const pharmacyAddtionalInfoSchema = z.object({
  ph_name: z.string().min(2, "First name is required"),
  address: z.string().min(2, "This field is required"),
  latitude: validationRules.latLng,
  longitude: validationRules.latLng,
  open_time: z.string().min(1, "Open time is required"),
  close_time: z.string().min(1, "Close time is required"),
  summery: z.string().min(15, "at least 15 characters"),
  expierence: z.coerce.number().min(0, "Year of experience is required"),
  license_images: z.union([
    z.any().refine((file): file is FileList => file instanceof FileList, {
      message: 'license images is required',
    }),
    z.string().array().refine((urls) => urls.every((url) => {
      try {
        const { pathname } = new URL(url);
        const extension = pathname.split('.').pop();
        return ['jpeg', 'jpg', 'png', 'gif', 'svg'].includes(extension?.toLowerCase() ?? '');
      } catch (error) {
        return false;
      }
    }), {
      message: 'Each string must be a valid image URL (jpeg, png, gif)',
    }),
  ]).optional(),
  logo_images: validationRules?.image.optional(),
  categories: z.array(z.string()).min(1, 'Must have at least one category'),
});