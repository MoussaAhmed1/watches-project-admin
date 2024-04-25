"use server";

/* eslint-disable consistent-return */

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import axiosInstance, {
  Params,
  endpoints,
  getErrorMessage,
} from "../utils/axios-client";
import { ITEMS_PER_PAGE } from "./Global-variables";
import { authOptions } from "@/app/api/auth/_options";

interface IParams {
  user_id?: string;
  sectionId?: string;
  headers?: { access_token: string };
}

export const fetchUsers = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
  filters,
  headers,
}: Params): Promise<any> => {
  const lang = cookies().get("Language")?.value;
  const accessToken = cookies().get('accessToken')?.value;
  const session = await getServerSession(authOptions);
  console.log("--------------session",session)
  console.log("--------------accessToken",accessToken)
  try {
    const res = await axiosInstance(endpoints.users.fetch, {
      params: {
        page,
        limit,
        filters: filters ? [`name_en=${filters}`, `name_ar=${filters}`] : null,
        sortBy: "created_at=desc",
      },
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iis5Njc1NTU1NTg4OCIsInN1YiI6IjBlM2E0MzJjLWZhN2ItNDA5Ni05NDAwLWI5MzYzZTljMjM0NCIsImlhdCI6MTcxNDAyNjQzMiwiZXhwIjoxNzI5NTc4NDMyfQ.j9FfUYuiguiCO_MThlD8eAycYT5e-uRT3lSbLsb4IAM`,
        "Accept-Language": lang,
      },
    });
    return res;
  } catch (error: any) {
    console.log(error)
    return {
      error: getErrorMessage(error),
    };
  }
};
