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

export const fetchReservations = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
  status,
  otherfilters,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  const _status: string = status !== "" ? `,status=${status}` : "";
  const userPhone = filters?`user.phone=${filters}`:"";
  const doctorPhone = filters?`doctor.user.phone=${filters}`:"";
  console.log(otherfilters)
  try {
    const res = await axiosInstance(endpoints.reservations.fetch, {
      params: {
        page,
        limit,
        filters: filters || status
          ? [
              `${userPhone}${_status}`,
              `${doctorPhone}${_status}`,
            ]
          : otherfilters ? otherfilters:null,
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

export const fetchSingleReservation = async (id: string): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance(`${endpoints.reservations.fetch}/${id}`, {
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

export const AcceptReservationCancelRequest = async ({
  id,
  reason,
}: {
  id: string;
  reason?: string;
}): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;
  const lang = cookies().get("Language")?.value;
  try {
    await axiosInstance.post(
      `${endpoints.reservations.cancleRequest}`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );
    revalidatePath(`/dashboard/reservations/${id}`);
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};
