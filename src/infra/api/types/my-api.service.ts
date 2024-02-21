import { AxiosRequestConfig } from 'axios';

export const MyApiServiceSymbol = Symbol('MyApiService');

export interface MyApiService {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;

  post<T, V>(url: string, body: T, config?: AxiosRequestConfig): Promise<V>;
}
