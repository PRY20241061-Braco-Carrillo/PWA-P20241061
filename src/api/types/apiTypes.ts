import { z } from 'zod';
import { HttpMethod, HttpStatusCode } from './enums';

export type HttpResponse<T> = {
  statusCode: HttpStatusCode;
  body: T;
};

export type HttpRequest<T = BodyInit> = {
  url: string;
  method: HttpMethod;
  body?: T | Record<string, any>;
  headers?: Record<string, any>;
  params?: Record<string, any>;
};

export const GenericSuccessResponseSchema = z.object({
  code: z.string(),
  status: z.string(),
});

export type GenericSuccessResponse = z.infer<typeof GenericSuccessResponseSchema>;

class HttpError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public title: string = ""
  ) {
    super("Ocurrió un error al solicitar el servicio");
    this.name = "HttpError";
  }
}

export { HttpError };
