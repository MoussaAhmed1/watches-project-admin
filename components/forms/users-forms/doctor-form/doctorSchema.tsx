import * as z from "zod";

const doctorSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  birth_date: z.date().optional(),
  gender: z.enum(["male", "female"]).optional(),
  phone: z.string().min(1, "Phone is required"),
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
  role: z.literal("DOCTOR"),
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
  video_consultation_price: z.coerce.number().positive('Must be a positive number'),
  voice_consultation_price: z.coerce.number().positive('Must be a positive number'),
  home_consultation_price: z.coerce.number().positive('Must be a positive number'),
  clinic_consultation_price: z.coerce.number().positive('Must be a positive number').optional(),
  specialization_id: z.string().min(1, "Specialization ID is required"),
  summery: z.string().optional(),
  year_of_experience: z.coerce.number().min(0, "Year of experience is required"),
  is_urgent: z.boolean().optional(),

  latitude: z.number({
    required_error: "Please Pick A Location On The Map",
    invalid_type_error: "Must be a number"
  }).refine(value => value !== undefined, { message: "Please Pick A Location On The Map" }).optional(),
  longitude: z.number({
    required_error: "Please Pick A Location On The Map",
    invalid_type_error: "Must be a number"
  }).refine(value => value !== undefined, { message: "Please Pick A Location On The Map" }).optional(),
  avaliablity: z.array(z.object({
    day: z.number().min(0).max(6),
    start_at: z.string().min(1, "Start time is required"),
    end_at: z.string().min(1, "End time is required"),
    is_active: z.boolean(),
  })).optional(),
  clinic: z.object({
    latitude: z.string().min(1, "Clinic latitude is required"),
    longitude: z.string().min(1, "Clinic longitude is required"),
    address: z.string().min(1, "Clinic address is required"),
    name: z.string().min(1, "Clinic name is required"),
    is_active: z.boolean(),
  }).optional(),
});

export default doctorSchema;