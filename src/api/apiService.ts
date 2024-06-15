import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { attachInterceptors } from './interceptors';
import { APIConstants } from './types/apiConstants';
import { HttpError, HttpResponse } from './types/apiTypes';
import { HttpMethod, HttpStatusCode } from './types/enums';

class ApiService {
  private httpClient: AxiosInstance;
  private token: string | null;

  constructor(token: string | null) {
    this.token = token;
    this.httpClient = axios.create({
      baseURL: APIConstants.BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    attachInterceptors(this.httpClient);
  }

  private async request<T>(config: AxiosRequestConfig): Promise<HttpResponse<T>> {
    if (this.token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${this.token}`,
      };
    }
    try {
      const response: AxiosResponse<T> = await this.httpClient.request(config);
      return {
        statusCode: response.status as HttpStatusCode,
        body: response.data,
      };
    } catch (error: any) {
      if (error.response) {
        throw new HttpError(error.response.status, error.response.data.message || 'Error', error.response.data.title || '');
      } else {
        throw new HttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, error.message);
      }
    }
  }

  public get<T>(url: string, params?: Record<string, any>, headers?: Record<string, any>) {
    return this.request<T>({ url, method: HttpMethod.GET, params, headers });
  }

  public post<T, R>(url: string, body: T, headers?: Record<string, any>) {
    return this.request<R>({ url, method: HttpMethod.POST, data: body, headers });
  }

  public put<T, R>(url: string, body: T, headers?: Record<string, any>) {
    return this.request<R>({ url, method: HttpMethod.PUT, data: body, headers });
  }

  public delete<T>(url: string, headers?: Record<string, any>) {
    return this.request<T>({ url, method: HttpMethod.DELETE, headers });
  }
}

export default ApiService;
