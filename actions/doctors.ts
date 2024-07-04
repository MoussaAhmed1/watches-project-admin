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
import { DoctorAddtionalInfoFormValues } from "@/components/forms/users-forms/doctor-form/doctor-addtional-info";

export const fetchDoctors = async ({

  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
  otherfilters
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  const spreadotherfilters:string = otherfilters? otherfilters.toString() : "";
  try {
    const res = await axiosInstance(endpoints.doctors.fetch, {
      params: {
        page,
        limit,
        filters: filters ? [`name=${filters}`,`name_en=${filters}`, `name_ar=${filters}`,spreadotherfilters] : spreadotherfilters ? [spreadotherfilters]:null,
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

export const fetchSingleDoctor = async (doctorId : string): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance(`${endpoints.doctors.fetch}/${doctorId}`, {
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

export const AcceptDoctorRequest = async (user_id:string): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;
  const lang = cookies().get("Language")?.value;
  try {
     await axiosInstance.post(
      `${endpoints.doctors.accept}/${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );
    revalidatePath(`/dashboard/doctors/${user_id}`);
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};


export const AddDoctor = async (formData: FormData): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  try {
    const accessToken = cookies().get("access_token")?.value;
  const res =   await axiosInstance.post(endpoints.doctors.register, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
        "Content-Type": "multipart/form-data",
      },
    });
    if(res?.data?.data?.id){
      await AcceptDoctorRequest(res?.data?.data?.id);
     }
    revalidatePath("/dashboard/doctors");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};





export const fetchDoctorAdditionalInfo = async ({userId}:{userId : string}): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
    const res = await axiosInstance(`/additional-info/doctor/info`, {
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

export const removeDoctorLicence = async ({id}:{id : string}): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;
  try {
     await axiosInstance.delete(`/additional-info/doctor-license/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    revalidatePath("/dashboard/doctors");
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};
export const updateDoctorAddtionalInfo= async ({userId,data}:{userId : string,data:DoctorAddtionalInfoFormValues}): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  try {
    const accessToken = cookies().get("access_token")?.value;
    await axiosInstance.put(`/additional-info/doctor/info`, data, {
      params:{
        id: userId
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });
    //need to validate the specified doctor /id
    revalidatePath("/dashboard/doctors");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};