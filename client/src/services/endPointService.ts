import {API_REQUEST_TIMEOUT, API_URL} from 'src/config';
import axios, {AxiosResponse} from 'axios';

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
    result = result.replace('{' + key + '}', encodeURI(value));
  });
  return result;
};

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

type InputType = object | null | undefined | void;

const endPoint = <EndPointInput extends InputType, EndPointOutput>(url: string, method: RequestMethod) =>
  async (params: EndPointInput, token?: string): Promise<AxiosResponse<EndPointOutput>> =>
    await axios.request<EndPointOutput>({
      url: params ? prepareUrl(url, params) : url,
      method,
      baseURL: API_URL,
      timeout: API_REQUEST_TIMEOUT,
      headers: token ? {...headers, 'Authorization': 'Bearer ' + token} : headers,
      data: JSON.stringify(params),
    });

export const getEndPoint = <In extends InputType, Out>(url: string) => endPoint<In, Out>(url, RequestMethod.GET);
export const postEndPoint = <In extends InputType, Out>(url: string) => endPoint<In, Out>(url, RequestMethod.POST);
export const putEndPoint = <In extends InputType, Out>(url: string) => endPoint<In, Out>(url, RequestMethod.PUT);
export const patchEndPoint = <In extends InputType, Out>(url: string) => endPoint<In, Out>(url, RequestMethod.PATCH);
export const deleteEndPoint = <In extends InputType, Out>(url: string) => endPoint<In, Out>(url, RequestMethod.DELETE);

export default endPoint;
