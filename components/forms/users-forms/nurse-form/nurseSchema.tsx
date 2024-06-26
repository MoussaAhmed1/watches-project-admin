import * as z from "zod";

const doctorSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  birth_date: z.date().refine((date) => date <= new Date(), {
    message: "Date cannot be in the future",
  }),
  gender: z.enum(["male", "female"]),
  phone: z.string().regex(/^\d{11}$/, "Phone number must be exactly 11 digits"),
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
  role: z.literal("NURSE"),
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
  ]),
  summary: z.string().min(15,"at least 15 characters"),
  experience: z.coerce.number().min(0, "Year of experience is required"),
});

export default doctorSchema;