'use server';

import axiosInstance, { endpoints, getErrorMessage } from '@/utils/axios-client';
import { cookies } from 'next/headers';


export const getImageUrl = async ({ image }: { image: FormData }): Promise<any> => {
  const accessToken = cookies().get('access_token')?.value;
  const lang = cookies().get('Language')?.value;

  try {
    const res = await axiosInstance.post(endpoints.storage?.base_storage, image, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': lang,
      },
    });
    console.log(res.data.data.url);
    return res.data.data.path;
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
