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
import { PackageFormValues } from "@/components/forms/package-form/add-edit-package";


export const fetchPackages = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get('access_token')?.value;
  try {
    const res = await axiosInstance(endpoints.packages.fetch, {
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


export const AddPackages = async (data: PackageFormValues): Promise<any> => {
  const lang = cookies().get('Language')?.value;

  try {
    const accessToken = cookies().get('accessToken')?.value;
    const res = await axiosInstance.post(endpoints.packages.fetch, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': lang,
      },
    });

    revalidatePath('/dashboard/packages');
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};