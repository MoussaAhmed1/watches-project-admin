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
import { Drug } from "@/types/pharmacy";

export const fetchPharmacies = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
  otherfilters
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  const spreadotherfilters:string = otherfilters? otherfilters.toString() : "";
  try {
    const res = await axiosInstance(endpoints.pharmacies.fetch, {
      params: {
        page,
        limit,
        filters:  filters ? [`name_en=${filters}`, `name_ar=${filters}`,spreadotherfilters] : spreadotherfilters ? [spreadotherfilters]:null,
        sortBy: "created_at=desc",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchSinglePharmacy = async (pharmacyId: string): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance(
      `${endpoints.pharmacies.fetch}/${pharmacyId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchPharmacyProducts = async ({

  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance(endpoints.pharmacy.drugs, {
      params: {
        page,
        limit,
        name: filters ? filters : null,
        sortBy: "created_at=desc",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const AcceptPharmacyRequest = async (id:string): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;
  const lang = cookies().get("Language")?.value;
  try {
     await axiosInstance.post(
      `${endpoints.pharmacy.accept}/${id}`,
      {id},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );
    revalidatePath(`/dashboard/pharmacies/${id}`);
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const AddPharmacyDrug = async (data: Drug): Promise<any> => {
  const lang = cookies().get('Language')?.value;
  const accessToken = cookies().get('access_token')?.value;

  try {
    await axiosInstance.post(endpoints.pharmacy.drugs, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': lang,
      },
    });

    revalidatePath('/dashboard/pharmacy/drugs');
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const UpdatePharmacyDrug = async (data: Drug,id:string|undefined): Promise<any> => {
  const lang = cookies().get('Language')?.value;
  const accessToken = cookies().get('access_token')?.value;

  try {
    await axiosInstance.put(`${endpoints.pharmacy.drugs}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': lang,
      },
    });

    revalidatePath('/dashboard/pharmacy/drugs');
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const deleteProduct = async (
  productId: any
): Promise<any> => {
  const accessToken = cookies().get('access_token')?.value;
  const lang = cookies().get('Language')?.value;

  try {
    const res = await axiosInstance.delete(
      `${endpoints.pharmacy.drugs}/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Accept-Language': lang,
        },
      }
    );
    revalidatePath('/dashboard/pharmacy/drugs');
    return res.data.message;
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};