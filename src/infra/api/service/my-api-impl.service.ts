import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

import { MyApiService } from '../types/my-api.service';

@Injectable()
export default class MyApiServiceImpl implements MyApiService {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const res = await axios.get<T>(url, config);
      return res.data;
    } catch (err) {
      throw new Error(err.response.data);
    }
  }

  async post<T, V>(url: string, body: V, config?: AxiosRequestConfig): Promise<T> {
    try {
      const res = await axios.post<T>(url, body, config);
      return res.data;
    } catch (err) {
      throw new Error(err.response.data);
    }
  }
}
