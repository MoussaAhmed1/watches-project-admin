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

export const fetchBanars = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance(endpoints.banar.fetch, {
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

export const ToggleBanar = async (formData: FormData) => {
  const id = formData.get("id");
  const accessToken = cookies().get("accessToken")?.value;
  const lang = cookies().get("Language")?.value;

  const is_active = formData.get("is_active");
  const data = {
    is_active: is_active === "false",
  };
  try {
    const res = await axiosInstance.patch(
      `${endpoints.banar.fetch}/{id}`,
      data,
      {
        params: { id },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );
    revalidatePath("/dashboard/banars");
    return res.data.message;
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const deleteBanar = async ({ id }: { id: string }): Promise<any> => {
  const accessToken = cookies().get("accessToken")?.value;
  const lang = cookies().get("Language")?.value;

  try {
    const res = await axiosInstance.delete(`${endpoints.banar.fetch}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    revalidatePath("/dashboard/banars");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
