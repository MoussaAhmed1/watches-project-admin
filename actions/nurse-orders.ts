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
import { getTodayDateSimpleFormat } from "@/utils/helperFunctions";


export const fetchNurseOrder = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
  status,
  otherfilters
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get('access_token')?.value;
  let _status: string = status !== "" ? `,status=${status}` : "";
  const userPhone = filters?`user.phone=${filters}`:"";
  const nursePhone = filters?`nurse.user.phone=${filters}`:"";

  if(status==="COMPLETED"){
    _status = `,status=STARTED,date_to<${getTodayDateSimpleFormat(new Date())}`
  }
  if(status==="STARTED"){
    _status = `,status=STARTED,date_to>${getTodayDateSimpleFormat(new Date())}`
  }
  try {
    const res = await axiosInstance(endpoints.nurse_orders.fetch, {
      params: {
        page,
        limit,
        filters: filters || status
          ? [
              `${userPhone}${_status}`,
              `${nursePhone}${_status}`,
              `user.first_name=${filters}${_status}`,
              `user.last_name=${filters}${_status}`,
              `nurse.user.first_name=${filters}${_status}`,
              `nurse.user.last_name=${filters}${_status}`,
            ]
          : otherfilters ? otherfilters:null,
        sortBy: "created_at=desc",
        isDeleted:true
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

export const fetchSingleNurseOrder = async (id: string): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance.get(`${endpoints.nurse_orders.fetch}/${id}`, {
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

export const AcceptNurseOrderCancelRequest = async ({id,reason}:{id:string,reason?:string}): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;
  const lang = cookies().get("Language")?.value;
  try {
     await axiosInstance.post(
      `${endpoints.nurse_orders.cancleRequest}`,
      {id,reason},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );
    revalidatePath(`/dashboard/nurse-orders/${id}`);
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};