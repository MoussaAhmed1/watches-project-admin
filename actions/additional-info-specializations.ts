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
import { AddEditSpecializationBody, ISpecializations } from "@/types/additional-info-specializations";

export const fetchAdditionalSpecializations = async ({

  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance(endpoints.addetionalInfo.specializations, {
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

export const AddSpecialization = async (data: AddEditSpecializationBody): Promise<any> => {
  const lang = cookies().get('Language')?.value;
  const accessToken = cookies().get('access_token')?.value;

  try {
    await axiosInstance.post(endpoints.addetionalInfo.specializations, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': lang,
      },
    });

    revalidatePath('/data-management/specializations');
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const UpdateSpecialization = async (data: AddEditSpecializationBody): Promise<any> => {
  const lang = cookies().get('Language')?.value;
  const accessToken = cookies().get('access_token')?.value;

  try {
    await axiosInstance.put(`${endpoints.addetionalInfo.specializations}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': lang,
      },
    });

    revalidatePath('/data-management/specializations');
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const deleteSpecialization = async (
  id: any
): Promise<any> => {
  const accessToken = cookies().get('access_token')?.value;
  const lang = cookies().get('Language')?.value;

  try {
    const res = await axiosInstance.delete(
      `${endpoints.addetionalInfo.specializations}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Accept-Language': lang,
        },
      }
    );
    revalidatePath('/data-management/specializations');
    return res.data.message;
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};