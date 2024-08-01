import { version } from '../../../../package.json';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios, { AxiosError, AxiosHeaders } from 'axios';
import {OrctaneError} from "../../error";

const defaultBaseUrl = 'https://client.orctane.com';
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

    async makeRequest<T>(
        path: string,
        options: AxiosRequestConfig = {},
    ): Promise<T> {
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

    async post<T>(
        path: string,
        body?: unknown,
        options: Omit<AxiosRequestConfig, 'method'> = {},
    ) {
        const requestOptions = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body),
            ...options,
        };

        return this.makeRequest<T>(path, requestOptions);
    }

    async get<T>(path: string, options: Omit<AxiosRequestConfig, 'method'> = {}) {
        const requestOptions = {
            method: 'GET',
            headers: this.headers,
            ...options,
        };

        return this.makeRequest<T>(path, requestOptions);
    }

    async put<T>(
        path: string,
        entity: unknown,
        options: Omit<AxiosRequestConfig, 'method'> = {},
    ) {
        const requestOptions = {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(entity),
            ...options,
        };

        return this.makeRequest<T>(path, requestOptions);
    }

    async patch<T>(
        path: string,
        entity: unknown,
        options: Omit<AxiosRequestConfig, 'method'> = {},
    ) {
        const requestOptions = {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(entity),
            ...options,
        };

        return this.makeRequest<T>(path, requestOptions);
    }

    async delete<T>(path: string, query?: unknown) {
        const requestOptions = {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify(query),
        };

        return this.makeRequest<T>(path, requestOptions);
    }
}