"use server";

/* eslint-disable consistent-return */

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

import axiosInstance, {
  Params,
  endpoints,
  getErrorMessage,
} from "../utils/axios-client";
import { ITEMS_PER_PAGE } from "./Global-variables";
import { AddEditFaqsBody } from "@/types/faqs";

export const fetchFaqs = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance(endpoints.faq.fetch, {
      params: {
        page,
        limit,
        filters: filters ? [`name_en=${filters}`, `name_ar=${filters}`] : null,
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
export const AddFAQ = async (
  data: AddEditFaqsBody,
): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;

  try {
    await axiosInstance.post(endpoints.faq.fetch, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });

    revalidateTag("/faq");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const UpdateFAQ = async (
  data: AddEditFaqsBody,id:string|undefined
): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;

  try {
    await axiosInstance.put(
      `${endpoints.faq.fetch}/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );

    revalidateTag("/faq");
  } catch (error:any) {
    return {
      error: getErrorMessage(error),
    };
  }
};
export const deleteFAQ = async (id: string): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;
  const lang = cookies().get("Language")?.value;

  try {
    await axiosInstance.delete(
      `${endpoints.faq.fetch}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );
    revalidateTag("/faq");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};