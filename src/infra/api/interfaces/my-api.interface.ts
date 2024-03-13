import { AxiosRequestConfig } from 'axios';

export const MyApiServiceKey = Symbol('MyApiService');

export interface IMyApiService {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;

  post<T, V>(url: string, body: T, config?: AxiosRequestConfig): Promise<V>;
}
