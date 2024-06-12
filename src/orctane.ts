import { version } from '../package.json';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios, { AxiosError, AxiosHeaders } from 'axios';
import { OrctaneError } from './error';

const defaultBaseUrl = 'https://api.orctane.com/v1';
const defaultUserAgent = `orctane-node:${version}`;

const baseURL =
  typeof process !== 'undefined' && process.env
    ? process.env.ORCTANE_BASE_URL || defaultBaseUrl
    : defaultBaseUrl;

const userAgent =
  typeof process !== 'undefined' && process.env
    ? process.env.ORCTANE_USER_AGENT || defaultUserAgent
    : defaultUserAgent;

export class Orctane {
  private readonly headers: AxiosHeaders;

  constructor(public readonly key?: string) {
    if (!key) {
      if (typeof process !== 'undefined' && process.env.ORCTANE_API_KEY) {
        this.key = process.env.ORCTANE_API_KEY as string;
      }

      if (!this.key) {
        throw new Error(
          'Missing API key. Pass it to the constructor `new Orctane("orc_ABC123")` or set the ORCTANE_API_KEY environment variable.',
        );
      }
    }

    this.headers = new AxiosHeaders({
      Authorization: `Bearer ${this.key}`,
      'User-Agent': userAgent,
      'Content-Type': 'application/json',
    });
  }

  private get request(): AxiosInstance {
    return axios.create({
      baseURL,
      headers: this.headers,
    });
  }

   async createRequest<T>(
    path: string,
    options: AxiosRequestConfig = {},
  ): Promise<{ data: T | null; error: OrctaneError | null }> {
    try {
      const response = await this.request({
        url: path,
        ...options,
      });

      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const message =
          err.response?.data?.message ?? err.message ?? 'Something went wrong';
        const status = err.response?.status ?? 500;
        throw new OrctaneError(message, status);
      }

      throw err;
    }
  }
}
