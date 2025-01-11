"use server";

/* eslint-disable consistent-return */

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import axiosInstance, {
  endpoints,
  getErrorMessage,
} from "../../utils/axios-client";
import { City } from "@/types/map";

export const AddCity = async (data: City): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;

  try {
    await axiosInstance.post(endpoints.Cities.create, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });

    revalidatePath("/dashboard/cities");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
export const EditCity = async (data: City): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;

  try {
    await axiosInstance.put(
      endpoints.Cities.edit,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );

    revalidatePath("/dashboard/cities");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const deleteCity = async (id: string): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get("access_token")?.value;

  try {
    await axiosInstance.delete(endpoints.Cities.delete + "/" + id, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang,
      },
    });

    revalidatePath("/dashboard/cities");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};


