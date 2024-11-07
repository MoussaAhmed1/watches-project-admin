"use server";

/* eslint-disable consistent-return */

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import axiosInstance, { endpoints, getErrorMessage } from "@/utils/axios-client";

export const fetchTermsConditions = async (): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;

  try {
    const res = await axiosInstance(endpoints.generalSettings.termsConditions, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.data;
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const changeTermsConditions = async (body: {
  static_page_type: string;
  content_ar: string;
  content_en: string;
}): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;
  const lang = cookies().get("Language")?.value;
  
  try {
    const res = await axiosInstance.patch(
      endpoints.generalSettings.root,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );
    revalidatePath('/dashboard/settings/terms-conditions');
    
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};


export const fetchCommission = async (): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;

  try {
    const res = await axiosInstance(endpoints.generalSettings.Commission, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res?.data?.data?.value;
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};


export const changeCommission = async (body: {
  commission: number;
}): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;
  const lang = cookies().get("Language")?.value;

  try {
    await axiosInstance.put(
      endpoints.generalSettings.Commission,
      {
        type:"COMMISSION",
        value:body?.commission
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );
    revalidatePath('/dashboard/data-management/commission');

  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const fetchPharmacyOrder = async (): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;

  try {
    const res = await axiosInstance(endpoints.generalSettings.PharmacyOrder, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res?.data?.data?.value;
  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};

//settings 
export const changePharmacyOrder = async (body: {
  pharmacy_order_number: number;
}): Promise<any> => {
  const accessToken = cookies().get("access_token")?.value;
  const lang = cookies().get("Language")?.value;

  try {
    await axiosInstance.put(
      endpoints.generalSettings.PharmacyOrder,
      {
        type:"PHARMACY_ORDER_NUMBER",
        value:body?.pharmacy_order_number
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": lang,
        },
      },
    );
    revalidatePath('/dashboard/data-management/pharmacy-order-number');

  } catch (error: any) {
    return {
      error: getErrorMessage(error),
    };
  }
};