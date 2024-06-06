"use server";

/* eslint-disable consistent-return */

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import axiosInstance, {
  endpoints,
  getErrorMessage,
} from "../utils/axios-client";

export const fetchAboutUs = async (): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;

  try {
    const res = await axiosInstance(endpoints.generalSettings.aboutUs, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.data;
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const changeAboutUs = async (body: {
  static_page_type: string;
  content_ar: string;
  content_en: string;
}): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;
  const lang = cookies().get("Language")?.value;

  try {
    const res = await axiosInstance.patch(
      endpoints.generalSettings.root,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );
    revalidatePath("/dashboard/settings/about-us");
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};
