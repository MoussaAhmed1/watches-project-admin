"use server";

/* eslint-disable consistent-return */

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import axiosInstance, {
  Params,
  endpoints,
  getErrorMessage,
} from "../utils/axios-client";
import { ITEMS_PER_PAGE } from "./Global-variables";

interface NotificationBody {
  message_ar: string
  message_en: string
  title_ar: string
  title_en: string
  role: string
  specific_person?: string[] | undefined
}
export async function sendNotifications(reqBody: NotificationBody) {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get('access_token')?.value;

  try {
    const res = await axiosInstance.post(`${endpoints.notification.send}`, reqBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': lang,
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  } catch (err) {
    console.log(err)
    return {
      error: getErrorMessage(err),
    };
  }
}