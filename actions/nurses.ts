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
import { NurseAddtionalInfoFormValues } from "@/components/forms/users-forms/nurse-form/nurse-addtional-info";

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
            `${spreadotherfilters},user.phone=${filters}`,
            `${spreadotherfilters},user.first_name=${filters}`,
            `${spreadotherfilters},user.last_name=${filters}`,
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

export const AcceptNurseRequest = async ({id}:{id:string}): Promise<any> => {
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
      await AcceptNurseRequest({id:res?.data?.data?.id});
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


export const fetchNurseAdditionalInfo = async ({userId}:{userId : string}): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance(`/additional-info/nurse-info`, {
      params:{
        id: userId
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

export const removeNurseLicence = async ({id}:{id : string}): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
     await axiosInstance.delete(`/additional-info/delete-nurse-license/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    revalidatePath("/dashboard/nurses");
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};
export const updateNurseAddtionalInfo= async ({userId,data}:{userId : string,data:NurseAddtionalInfoFormValues}): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  try {
    const accessToken = cookies().get("access_token")?.value;
    await axiosInstance.put(`/additional-info/update-nurse-info`, data, {
      params:{
        id: userId
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    //need to validate the specified doctor /id
    revalidatePath("/dashboard/nurses");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};