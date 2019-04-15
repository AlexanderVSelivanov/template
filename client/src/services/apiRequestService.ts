import axios, {AxiosInstance, AxiosResponse} from 'axios';

import {API_REQUEST_TIMEOUT, API_URL} from 'src/config';

const requestHeaders = {
  Accept: 'application/json',
};

const publicRequestAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {...requestHeaders},
  timeout: API_REQUEST_TIMEOUT,
});

let privateRequestAxiosInstance = {
  token: null as string | null,
  instance: null as AxiosInstance | null,
};

const getPrivateRequestAxiosInstance = (token: string): AxiosInstance => {
  if (privateRequestAxiosInstance.token !== token) {
    privateRequestAxiosInstance = {
      token,
      instance: axios.create({
        baseURL: API_URL,
        headers: {
          ...requestHeaders,
          XAuthToken: token,
        },
        timeout: API_REQUEST_TIMEOUT,
      }),
    };
  }
  if (!privateRequestAxiosInstance.instance) {
    const errorMessage = `AxiosInstance for private request wasn't created (token: ${token})`;
    throw Error(errorMessage);
  }
  return privateRequestAxiosInstance.instance;
};

const apiRequestService = (token: string | undefined): AxiosInstance => {
  return token ? getPrivateRequestAxiosInstance(token) : publicRequestAxiosInstance;
};

export const handleRequestResult = async (axiosPromise: AxiosResponse<any>) => {
  const {status, data} = await axiosPromise;
  return {status, response: data.response};
};

export default apiRequestService;
