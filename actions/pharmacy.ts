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
import { AcceptPharmacyRequest } from "./pharmacies";

export const fetchPharmacy = async ({

  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("accessToken")?.value;
  try {
    const res = await axiosInstance(endpoints.pharmacy.fetch, {
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

export const AddPharmacy = async (formData: FormData): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  try {
    const accessToken = cookies().get("access_token")?.value;
    const res =  await axiosInstance.post(endpoints.pharmacy.register, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res)
    if(res?.data?.data?.id){
      await AcceptPharmacyRequest(res?.data?.data?.id);
     }
    revalidatePath("/dashboard/pharmacy");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const updatePharmacys = async (
  data: any,
  id: string | undefined,
): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const body = { ...data, id };
  try {
    const accessToken = cookies().get("access_token")?.value;
    await axiosInstance.put(endpoints.pharmacy.fetch, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });

    revalidatePath("/dashboard/pharmacy");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
