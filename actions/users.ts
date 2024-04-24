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

interface IParams {
  user_id?: string;
  sectionId?: string;
  headers?: { access_token: string };
}

export const fetchUsers = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
  headers,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;

  try {
    const res = await axiosInstance(endpoints.users.fetch, {
      params: {
        page,
        limit,
        filters: filters ? [`name_en=${filters}`, `name_ar=${filters}`] : null,
        sortBy: "created_at=desc",
      },
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiMSIsImlhdCI6MTcxMzk5MDIzNywiZXhwIjoxNzI5NTQyMjM3fQ.zNGeaHHTEMexUf45OYIk8RUjOdf9r153qfWE2BjxlIA`,
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
