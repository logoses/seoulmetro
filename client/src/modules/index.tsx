import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const HOST = 'https://nexways.co.kr/NexWaysAPI';

export const axiosDefaultInstance = axios.create({
  baseURL: `${HOST}/api`,
});

export const nipaApi = {
  // Client Key 이메일 발송 요청
  clientKeyRequest: (email: string) => {
    const qs = require('qs');

    return axiosDefaultInstance({
      method: 'post',
      url: '/createKey',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({ email: email }),
      responseType: 'json',
    });
  },

  // 인증키 요청
  tokenRequest: (clientKey: string) =>
    axiosDefaultInstance({
      method: 'get',
      url: '/createToken',
      headers: {
        Authorization: `Basic ${clientKey}`,
      },
    }),

  // 오픈 데이타 요청
  dataRequest: (num: string, sex: string, age: string, dataloc: string, accessToken: string) =>
    axiosDefaultInstance({
      method: 'get',
      url: '/data',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        num: num,
        sex: sex,
        age: age,
        dataloc: dataloc,
      },
      responseType: 'blob',
    }),

  // 세그먼트 파일 요청
  fileRequest: (accessToken: string, formData: FormData) =>
    axiosDefaultInstance({
      method: 'post',
      url: '/segment',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      data: formData,
      responseType: 'blob',
    }),
};
