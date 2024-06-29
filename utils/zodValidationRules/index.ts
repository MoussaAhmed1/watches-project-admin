import { z } from "zod";


export const isNotFutureDate = (date: string) => {
  const val = new Date(date);
  // Check if the date is not in the future based on day

  const now = new Date();
  now.setDate(now.getDate() + 1);
  now.setHours(0, 0, 0, 0);
  return val < now;
};


const validationRules = {
  // string
  string_en: z
    .string()
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Must be English characters only" })
    .min(3, { message: "must be at least 3 characters" }),
  string_ar: z
    .string()
    .regex(/^[\u0600-\u06FF0-9\s]+$/, {
      message: "Must be Arabic characters only",
    })
    .min(3, { message: "must be at least 3 characters" }),
  //number
  number: z.coerce.number().positive("Must be a positive number"),
  //date
  date:z.string().refine((val) => isNotFutureDate(val), "Date cannot be in the future"),
  // multiple files
  images: z.union([
    z.any().refine((file): file is FileList => file instanceof FileList, {
      message: "license images is required",
    }),
    z.string().refine(
      (url) => {
        try {
          const { pathname } = new URL(url);
          const extension = pathname.split(".").pop();
          return ["jpeg", "jpg", "png", "gif", "svg"].includes(
            extension?.toLowerCase() ?? "",
          );
        } catch (error) {
          return false;
        }
      },
      {
        message: "String must be a valid image URL (jpeg, png, gif)",
      },
    ),
  ]),
  //single image
  image: z.union([
    z
      .any()
      .refine((file): file is File => file instanceof File, {
        message: "File must be uploaded",
      })
      .refine(
        (file) =>
          file &&
          ["image/jpeg", "image/png", "image/gif", "image/svg+xml"].includes(
            file.type,
          ),
        {
          message: "File must be an image (jpeg, png, gif)",
        },
      ),
    z.string().refine(
      (url) => {
        try {
          const { pathname } = new URL(url);
          const extension = pathname.split(".").pop();
          return ["jpeg", "jpg", "png", "gif", "svg"].includes(
            extension?.toLowerCase() ?? "",
          );
        } catch (error) {
          return false;
        }
      },
      {
        message: "String must be a valid image URL (jpeg, png, gif)",
      },
    ),
  ]),
  //phone 
  phone:z.string().regex(/^\+\d{12}$/, "Phone number must be exactly 13 characters, starting with a plus sign followed by 12 digits"),
  //lat and long
  latLng: z
    .number({
      required_error: "Please Pick A Location On The Map",
      invalid_type_error: "Must be a number",
    })
    .refine((value) => value !== undefined, {
      message: "Please Pick A Location On The Map",
    }),
    //gender
    gender: z.enum(["male", "female"])
};

export default validationRules;
