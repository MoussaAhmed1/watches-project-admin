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
import { AddEditPharmacyCategoriesBody } from "@/types/pharmacy-categories";

export const fetchPharmacyCategories = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance(endpoints.pharmacy.categories, {
      params: {
        page,
        limit,
        filters: filters ? [`name=${filters}`,`name_en=${filters}`, `name_ar=${filters}`] : null,
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

export const AddCategory = async (
  data: AddEditPharmacyCategoriesBody,
): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;

  try {
    await axiosInstance.post(endpoints.pharmacy.categories, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });

    revalidateTag("/pharmacy-categories");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const UpdateCategory = async (
  data: AddEditPharmacyCategoriesBody,id:string|undefined
): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;

  try {
    await axiosInstance.put(
      `${endpoints.pharmacy.categories}/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );

    revalidateTag("/pharmacy-categories");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const deleteCategory = async (id: string): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;
  const lang = cookies().get("Language")?.value;

  try {
    await axiosInstance.delete(
      `${endpoints.pharmacy.categories}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );
    revalidateTag("/pharmacy-categories");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
