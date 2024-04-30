/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { AxiosRequestConfig } from 'axios';
import { IMyApiService } from '../../infra/api/interfaces/my-api.interface';

export default class MyApiServiceStub implements IMyApiService {
  private getResponseMap: Map<string, any> = new Map();

  private postResponseMap: Map<string, any> = new Map();

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.getResponseMap.get(url);
  }

  async post<T, V>(url: string, body: T, config?: AxiosRequestConfig): Promise<V> {
    return this.postResponseMap.get(url);
  }

  setGetResponseMap(url: string, response: any) {
    this.getResponseMap.set(url, response);
  }

  setPostResponseMap(url: string, response: any) {
    this.postResponseMap.set(url, response);
  }

  reset() {
    this.getResponseMap.clear();
    this.postResponseMap.clear();
  }
}
