import validationRules from "@/utils/zodValidationRules";
import * as z from "zod";

const doctorAddtionalInfoSchema = z.object({
  cover_image: z.union([
    z.any().refine((file): file is File => file instanceof File, {
      message: 'Cover image is required',
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
  video_consultation_price: z.coerce.number().positive('Must be a positive number'),
  voice_consultation_price: z.coerce.number().positive('Must be a positive number'),
  home_consultation_price: z.coerce.number().positive('Must be a positive number'),
  specialization_id: z.string().min(1, "Specialization ID is required"),
  summery: z.string().min(15, "at least 15 characters"),
  year_of_experience: z.coerce.number().min(0, "Year of experience is required"),
  is_urgent: z.union([z.string(), z.boolean()]),

  latitude: z.number({
    required_error: "Please Pick A Location On The Map",
    invalid_type_error: "Must be a number"
  }).refine(value => value !== undefined, { message: "Please Pick A Location On The Map" }),
  longitude: z.number({
    required_error: "Please Pick A Location On The Map",
    invalid_type_error: "Must be a number"
  }).refine(value => value !== undefined, { message: "Please Pick A Location On The Map" }),
  avaliablity: z.array(
    z.object({
      day: z.number().optional(),
      start_at: z.string().optional(),
      end_at: z.string().optional(),
      is_active: z.boolean().optional()
    })
  ).min(1, "at least one day must be specified"),
  clinic_consultation_price: z.coerce.number().min(0,'Must be a positive number').optional(),
  clinic: z.object({
    latitude: validationRules.latLng.optional(),
    longitude: validationRules.latLng.optional(),
    address: z.string().optional(),
    name: z.string().optional(),
    is_active: z.union([z.string(), z.boolean()]).optional(),
  }).optional().nullable(),
})

export default doctorAddtionalInfoSchema;