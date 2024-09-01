import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';
import { version } from '../../../../package.json';
import { OrctaneError } from '../../error';

// const defaultBaseUrl = 'http://localhost:5662';
const defaultBaseUrl = 'https://cms.orctane.com';
const defaultUserAgent = `orctane-node:${version}`;

const baseURL =
  typeof process !== 'undefined' && process.env
    ? process.env.ORCTANE_BASE_URL || defaultBaseUrl
    : defaultBaseUrl;

const userAgent =
  typeof process !== 'undefined' && process.env
    ? process.env.ORCTANE_USER_AGENT || defaultUserAgent
    : defaultUserAgent;

export class RequestHelper {
  private readonly headers: Record<string, string>;
  constructor(public readonly key: string) {
    this.headers = {
      Authorization: `Bearer ${this.key}`,
      'User-Agent': userAgent,
      'Content-Type': 'application/json',
    };
  }

  private get request(): AxiosInstance {
    return axios.create({
      baseURL,
      headers: this.headers,
    });
  }

  async makeRequest<T>(
    path: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response = await this.request({
        url: path,
        ...options,
      });

      return response.data;
    } catch (err: any) {
      if (err instanceof AxiosError) {
        const message =
          err.response?.data?.message ?? err.message ?? 'Something went wrong';
        const status = err.response?.status ?? 500;
        throw new OrctaneError(message, status);
      }

      throw new OrctaneError(err.message, 500);
    }
  }

  async post<T>(
    path: string,
    data?: unknown,
    options: Omit<AxiosRequestConfig, 'method'> = {}
  ) {
    const requestOptions: AxiosRequestConfig = {
      method: 'POST',
      headers: this.headers,
      data,
      ...options,
    };

    return await this.makeRequest<T>(path, requestOptions);
  }

  async get<T>(path: string, options: Omit<AxiosRequestConfig, 'method'> = {}) {
    const requestOptions = {
      method: 'GET',
      headers: this.headers,
      ...options,
    };

    return await this.makeRequest<T>(path, requestOptions);
  }

  async put<T>(
    path: string,
    data: unknown,
    options: Omit<AxiosRequestConfig, 'method'> = {}
  ) {
    const requestOptions = {
      method: 'PUT',
      headers: this.headers,
      data,
      ...options,
    };

    return await this.makeRequest<T>(path, requestOptions);
  }

  async patch<T>(
    path: string,
    data: unknown,
    options: Omit<AxiosRequestConfig, 'method'> = {}
  ) {
    const requestOptions = {
      method: 'PATCH',
      headers: this.headers,
      data,
      ...options,
    };

    return await this.makeRequest<T>(path, requestOptions);
  }

  async delete<T>(path: string, query?: unknown) {
    const requestOptions = {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(query),
    };

    return await this.makeRequest<T>(path, requestOptions);
  }
}
