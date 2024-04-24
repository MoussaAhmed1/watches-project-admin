'use server';

/* eslint-disable consistent-return */

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import axiosInstance, { Params, endpoints, getErrorMessage } from '../utils/axios-client';

interface IParams {
  user_id?: string;
  sectionId?: string;
  headers?: { access_token: string };
}

export const fetchDoctors = async ({
    page = 1,
    limit = 5,
    filters,
    headers,
  }: Params): Promise<any> => {
    const lang = cookies().get('Language')?.value;
  
    try {
      const res = await axiosInstance(endpoints.doctors.fetch, {
        params: {
          page,
          limit,
          filters: filters ? [`name_en=${filters}`, `name_ar=${filters}`] : null,
          sortBy: 'created_at=desc',
        },
        headers: { Authorization: `Bearer ${headers?.access_token}`, 'Accept-Language': lang },
      });
      return res;
    } catch (error:any) {
      console.log(error);
      throw new Error(error);
    }
  };