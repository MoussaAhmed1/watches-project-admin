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

export const fetchReviews = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
  otherfilters
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  const spreadotherfilters:string = otherfilters? otherfilters.toString() : "";
  try {
    const res = await axiosInstance(endpoints.reviews, {
      params: {
        page,
        limit,
        filters: filters ? [`name=${filters}`,`name_en=${filters}`, `name_ar=${filters}`,spreadotherfilters] : spreadotherfilters ? [spreadotherfilters]:null,
        sortBy: "created_at=desc",
      },
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

export const fetchNurseReviews = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
  otherfilters
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  const spreadotherfilters:string = otherfilters? otherfilters.toString() : "";
  try {
    const res = await axiosInstance(endpoints.nurses.reviews, {
      params: {
        // page,
        // limit,
        filters: spreadotherfilters ? [spreadotherfilters]:null,
        sortBy: "created_at=desc",
      },
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

