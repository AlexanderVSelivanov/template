import {API_REQUEST_TIMEOUT, API_URL} from 'src/config';
import axios, {AxiosPromise} from 'axios';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const prepareUrl = (url: string, params: object | null | undefined | void): string => {
  if (!params) {
    return url;
  }
  let result = API_URL + url;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace('{' + key + '}', value);
  });
  return result;
};

const headers = {
  Accept: 'application/json',
  ContentType: 'application/json',
};

const EndPoint = <In extends object | null | undefined | void, Out>
(
  url: string,
  method: RequestMethod,
) => (params: In, token?: string): AxiosPromise<Out> => {
  return axios.request<Out>({
    url: params ? prepareUrl(url, params) : url,
    method,
    baseURL: API_URL,
    timeout: API_REQUEST_TIMEOUT,
    headers: token ? {...headers, XAuthToken: token} : headers,
    data: JSON.stringify(params),
  });
};

export const EndPointGet =
  <In extends object | null | undefined | void, Out>(url: string) => EndPoint(url, RequestMethod.GET);
export const EndPointPost =
  <In extends object | null | undefined | void, Out>(url: string) => EndPoint(url, RequestMethod.POST);
export const EndPointPut =
  <In extends object | null | undefined | void, Out>(url: string) => EndPoint(url, RequestMethod.PUT);
export const EndPointPatch =
  <In extends object | null | undefined | void, Out>(url: string) => EndPoint(url, RequestMethod.PATCH);
export const EndPointDelete =
  <In extends object | null | undefined | void, Out>(url: string) => EndPoint(url, RequestMethod.DELETE);

export default EndPoint;
