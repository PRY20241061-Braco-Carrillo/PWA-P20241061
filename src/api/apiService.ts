import { HttpRequest, HttpResponse,  HttpError } from './types/apiTypes';
import { HttpMethod, HttpStatusCode } from './types/enums';


export class ApiService {
    private async fetch<T>(request: HttpRequest): Promise<HttpResponse<T>> {
      const { url, method, body, headers, params } = request;
      const config: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      };
  
      const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
      const response = await fetch(url + queryString, config);
      const data = await response.json();
  
      if (!response.ok) {
        throw new HttpError(response.status, data.message || 'Error', data.title || '');
      }
  
      return {
        statusCode: response.status as HttpStatusCode,
        body: data,
      };
    }
  
    public get<T>(url: string, params?: Record<string, any>, headers?: Record<string, any>) {
      return this.fetch<T>({ url, method: HttpMethod.GET, params, headers });
    }
  
    public post<T extends BodyInit | Record<string, any>, R>(url: string, body: T, headers?: Record<string, any>) {
      return this.fetch<R>({ url, method: HttpMethod.POST, body, headers });
    }
  
    public put<T extends BodyInit | Record<string, any>, R>(url: string, body: T, headers?: Record<string, any>) {
      return this.fetch<R>({ url, method: HttpMethod.PUT, body, headers });
    }
  
    public delete<T>(url: string, headers?: Record<string, any>) {
      return this.fetch<T>({ url, method: HttpMethod.DELETE, headers });
    }
  }
  
  export const apiService = new ApiService();