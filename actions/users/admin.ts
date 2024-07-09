"use server";

/* eslint-disable consistent-return */

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import axiosInstance, {
  endpoints,
  getErrorMessage,
} from "../../utils/axios-client";


export const AddAdmin = async (formData: FormData): Promise<any> => {
    const lang = cookies().get("Language")?.value;
    try {
      const accessToken = cookies().get("access_token")?.value;
      await axiosInstance.post(endpoints.admins.register, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
          "Content-Type": "multipart/form-data",
        },
      });
  
      revalidatePath("/dashboard/admins");
    } catch (error) {
      return {
        error: getErrorMessage(error),
      };
    }
  };