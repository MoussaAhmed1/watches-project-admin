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

export const fetchUsers = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
  role = "client",
}: Params & { role?: string }): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance(endpoints.users.fetch, {
      params: {
        page,
        limit,
        filters: filters
          ? [`name_en=${filters}`, `name_ar=${filters}`, `roles=${role}`]
          : [`roles=${role}`],
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

export const AddPatient = async (formData: FormData): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  try {
    const accessToken = cookies().get("access_token")?.value;
    await axiosInstance.post(endpoints.users.register, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
        "Content-Type": "multipart/form-data",
      },
    });

    revalidatePath("/dashboard/patients");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
export const updatePatients = async (
  data: any,
  id: string | undefined,
): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const body = { ...data, id };
  try {
    const accessToken = cookies().get("access_token")?.value;
    await axiosInstance.put(endpoints.users.fetch, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });

    revalidatePath("/dashboard/patients");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const fetchProfileInfo = async ({
  userId,
}: {
  userId: string;
}): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance(`/additional-info/profile`, {
      params: {
        id: userId,
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

export const updateUsersProfile = async (
  formData: FormData,
  id: string,
  revalidatequery: string,
): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  try {
    const accessToken = cookies().get("access_token")?.value;
    await axiosInstance.put(`${endpoints.doctors.updateProfile}`, formData, {
      params: { id },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
        "Content-Type": "multipart/form-data",
      },
    });

    revalidatePath(revalidatequery);
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const removeUser = async ({
  id,
  revalidateData,
}: {
  id: string;
  revalidateData?: string;
}): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    await axiosInstance.delete(`/user/delete`, {
      params: {
        id,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    if (revalidateData) {
      revalidatePath(revalidateData);
    }
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};
