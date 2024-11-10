"use server";

/* eslint-disable consistent-return */

import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import axiosInstance, {
  endpoints,
  getErrorMessage,
  Params,
} from "../../utils/axios-client";
import { ITEMS_PER_PAGE } from "../Global-variables";
import { AddEditWatchBody } from "@/types/watches";

export const fetchWatches = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance.get(endpoints.watches.fetch, {
      params: {
        page,
        limit,
        filters,
        // sortBy: "created_at=desc",
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

export const AddWatch = async (
  data: AddEditWatchBody,
): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;

  try {
    await axiosInstance.post(endpoints.watches.create + "/" + data.IMEI, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });

    revalidateTag("/watches");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const UpdateWatch = async (
  data: AddEditWatchBody,id:string|undefined
): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;

  try {
    await axiosInstance.put(
      `${""}/${id}`,
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

export const removeUser = async ({id,revalidateData}:{id:string,revalidateData?:string}): Promise<any> => {
    const lang = cookies().get("Language")?.value;
    try {
      const accessToken = cookies().get("access_token")?.value;
      await axiosInstance.delete(endpoints.admins.register, {
        params: {
          id
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
          "Content-Type": "multipart/form-data",
        },
      });
  
      revalidatePath("/dashboard/admins");
      if (revalidateData) {
        revalidatePath(revalidateData);
      }
    } catch (error) {
      return {
        error: getErrorMessage(error),
      };
    }
  };