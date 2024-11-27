"use server";

/* eslint-disable consistent-return */

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import axiosInstance, {
  endpoints,
  getErrorMessage,
  Params,
} from "../../utils/axios-client";
import { ITEMS_PER_PAGE } from "../Global-variables";
import { AddEditWatchBody } from "@/types/watches";
import { redirect } from "next/navigation";

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
        filters: filters ? [`IMEI=${filters}`,`watch_user.name=${filters}`] : null,
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

export const fetchSingleWatche = async (id: string): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance.get(
      endpoints.watches.fetchSingleWatch + "/" + id,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );
    return res;
  } catch (error: any) {
    redirect("/404");
    return {
      error: getErrorMessage(error),
    };
  }
};

export const AddWatch = async (data: AddEditWatchBody): Promise<any> => {
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
export const EditWatch = async (data: AddEditWatchBody): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;

  try {
    await axiosInstance.post(
      endpoints.watches.edit + "/" + data.id + "/" + data.IMEI,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );

    revalidateTag("/watches");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const deleteWatch = async (id: string): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;

  try {
    await axiosInstance.delete(endpoints.watches.delete + "/" + id, {
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
