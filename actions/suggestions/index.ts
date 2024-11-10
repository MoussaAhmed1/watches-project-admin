"use server";

/* eslint-disable consistent-return */
import { cookies } from "next/headers";

import axiosInstance, { endpoints, Params } from "@/utils/axios-client";
import { ITEMS_PER_PAGE } from "../Global-variables";

export const fetchSuggestions = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance(endpoints.suggestions.fetch, {
      params: {
        page,
        limit,
        filters: [
          `user.phone=${filters}`,
          `user.name=${filters}`,
        ],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    return res;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const fetchSingleSuggestion = async (id: string): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance(`${endpoints.suggestions.fetch}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
      params:{
        isDeleted:true
      }
    });
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};