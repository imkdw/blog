import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { IMyApiService } from '../interfaces/my-api.interface';

@Injectable()
export default class MyApiService implements IMyApiService {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const res = await axios.get<T>(url, config);
      return res.data;
    } catch (err) {
      Logger.error((err as AxiosError).response.data);
      throw new Error(err);
    }
  }

  async post<T, V>(url: string, body: V, config?: AxiosRequestConfig): Promise<T> {
    try {
      const res = await axios.post<T>(url, body, config);
      return res.data;
    } catch (err) {
      Logger.error((err as AxiosError).response.data);
      throw new Error(err);
    }
  }
}
