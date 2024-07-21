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
  const _otherfilters: string = otherfilters?.length ? `${otherfilters.toString()},` : "";

  let filtersArray = [
    `${_otherfilters}user.phone=${filters}${_status}`,
    `${_otherfilters}doctor.user.phone=${filters}${_status}`,
    `${_otherfilters}user.first_name=${filters}${_status}`,
    `${_otherfilters}user.last_name=${filters}${_status}`,
    `${_otherfilters}doctor.user.first_name=${filters}${_status}`,
    `${_otherfilters}doctor.user.last_name=${filters}${_status}`,
  ]
  if(!status && filters && _otherfilters){
    filtersArray = [
      `${_otherfilters}user.phone=${filters}${",status=STARTED"}`,
      `${_otherfilters}doctor.user.phone=${filters}${",status=STARTED"}`,
      `${_otherfilters}user.first_name=${filters}${",status=STARTED"}`,
      `${_otherfilters}user.last_name=${filters}${",status=STARTED"}`,
      `${_otherfilters}doctor.user.first_name=${filters}${",status=STARTED"}`,
      `${_otherfilters}doctor.user.last_name=${filters}${",status=STARTED"}`,
      
      `${_otherfilters}user.phone=${filters}${",status=SCHEDULED"}`,
      `${_otherfilters}doctor.user.phone=${filters}${",status=SCHEDULED"}`,
      `${_otherfilters}user.first_name=${filters}${",status=SCHEDULED"}`,
      `${_otherfilters}user.last_name=${filters}${",status=SCHEDULED"}`,
      `${_otherfilters}doctor.user.first_name=${filters}${",status=SCHEDULED"}`,
      `${_otherfilters}doctor.user.last_name=${filters}${",status=SCHEDULED"}`,
    ]
  }
  else if (!status && !filters && _otherfilters){
    filtersArray = [
      `${_otherfilters}${"status=STARTED"}`,
      `${_otherfilters}${"status=SCHEDULED"}`,
    ]
  }
  console.log(filtersArray)
  try {
    const res = await axiosInstance(endpoints.reservations.fetch, {
      params: {
        page,
        limit,
        filters: filters || status || _otherfilters
          ? filtersArray
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
      { id,reason },
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
