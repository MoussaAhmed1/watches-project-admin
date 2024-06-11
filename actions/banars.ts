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

export const fetchBanners = async ({
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

export const fetchSingleBanar = async ({
  banarId,
}: {
  banarId: string;
}): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;

  try {
    const res = await axiosInstance(`${endpoints.banar.fetch}/${banarId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    return res.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const ToggleBanner = async (formData: FormData) => {
  const id = formData.get("id");
  const accessToken = cookies().get("access_token")?.value;
  const lang = cookies().get("Language")?.value;
  const is_active = formData.get("is_active");
  formData.set("is_active", JSON.stringify(!!(is_active === "false")));

  try {
    const res = await axiosInstance.patch(
      `${endpoints.banar.fetch}/${id}`,
      formData,
      {
        params: { id },
        headers: {
          "Content-Type": "multipart/form-data",
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

export const addBanar = async (formData: FormData): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;

  try {
    await axiosInstance.post(endpoints.banar.fetch, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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
export const editBanar = async (
  formData: FormData,
  id: string,
): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;

  try {
    await axiosInstance.patch(`${endpoints.banar.fetch}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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
export const deleteBanner = async ({ id }: { id: string }): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;
  const lang = cookies().get("Language")?.value;

  try {
    await axiosInstance.delete(`${endpoints.banar.fetch}/${id}`, {
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
