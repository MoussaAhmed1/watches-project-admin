import * as z from "zod";

const nurseAddtionalInfoSchema = z.object({
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
  summary: z.string().min(15, "at least 15 characters"),
  experience: z.coerce.number().min(0, "Year of experience is required"),
});

export default nurseAddtionalInfoSchema;