"use server";

/* eslint-disable consistent-return */

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import axiosInstance, {
  endpoints,
  getErrorMessage,
} from "../utils/axios-client";
import { ISocialLink } from "@/types/social-links";

export const fetchContactUs = async ({
  lang,
}: {
  lang: string;
}): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;

  try {
    const res = await axiosInstance(endpoints.generalSettings.ContactUs, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    return res.data;
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const changeContactLink = async (url: string,id:string): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;
  const lang = cookies().get("Language")?.value;

  try {
     await axiosInstance.patch(
      `${endpoints.generalSettings.ContactUs}/${id}`,
      {url},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );
    revalidatePath("/dashboard/settings/contact-us");
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const AddContactLink = async (body:ISocialLink): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;
  const lang = cookies().get("Language")?.value;

  try {
     await axiosInstance.post(
      `${endpoints.generalSettings.ContactUs}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );
    revalidatePath("/dashboard/settings/contact-us");
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const deleteContactLink = async (id: string): Promise<any> => {
  try {
    const accessToken = cookies().get('access_token')?.value;
    const lang = cookies().get('Language')?.value;

     await axiosInstance.delete(
      `${endpoints.generalSettings.ContactUs}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Accept-Language': lang,
        },
      }
    );
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
  revalidatePath('/dashboard/additional-services');
};