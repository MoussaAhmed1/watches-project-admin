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

export const fetchNurses = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
  otherfilters,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  const spreadotherfilters: string = otherfilters
    ? otherfilters.toString()
    : "";
  try {
    const res = await axiosInstance(endpoints.nurses.fetch, {
      params: {
        page,
        limit,
        filters: filters
          ? [
              `name=${filters}`,
              `name_en=${filters}`,
              `name_ar=${filters}`,
              spreadotherfilters,
            ]
          : spreadotherfilters
          ? [spreadotherfilters]
          : null,
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
// TODO: IMPELEMENTING GETTING SINGLE Nurse
export const fetchSingleNurse = async (id: string): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance(`${endpoints.nurses.fetch}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    return res;
  } catch (error: any) {
    throw new Error(error);
    return {
      error: getErrorMessage(error),
    };
  }
};

export const AcceptNurseRequest = async (id: string): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;
  const lang = cookies().get("Language")?.value;
  try {
    await axiosInstance.post(
      `${endpoints.nurses.accept}/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );
    revalidatePath(`/dashboard/nurses/${id}`);
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const AddNurse = async (formData: FormData): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  try {
    const accessToken = cookies().get("access_token")?.value;
    const res = await axiosInstance.post(endpoints.nurses.register, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
        "Content-Type": "multipart/form-data",
      },
    });

    revalidatePath("/dashboard/nurses");
    if(res?.data?.data?.id){
      await AcceptNurseRequest(res?.data?.data?.id);
     }
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const updateNurses = async (
  data: any,
  id: string | undefined,
): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const body = { ...data, id };
  try {
    const accessToken = cookies().get("access_token")?.value;
    await axiosInstance.put(endpoints.nurses.fetch, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });

    revalidatePath("/dashboard/nurses");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
