"use server";

/* eslint-disable consistent-return */

import { cookies } from "next/headers";

import axiosInstance, {
  endpoints,
  getErrorMessage,
} from "../utils/axios-client";

export const fetchAdditionalProfile = async (): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance(endpoints.addetionalInfo.profile, {

      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    return res;
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};