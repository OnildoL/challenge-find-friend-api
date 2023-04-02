import { HttpResponseInterface } from "@/application/interfaces/http-response";

export const success = (data: any): HttpResponseInterface => ({
  statusCode: 200,
  body: data,
});

export const created = (data: any): HttpResponseInterface => ({
  statusCode: 201,
  body: data,
});

export const forbidden = (error: Error): HttpResponseInterface => ({
  statusCode: 403,
  body: error,
});

export const badRequest = (error: Error): HttpResponseInterface => ({
  statusCode: 400,
  body: error,
});

export const serverError = (error: Error): HttpResponseInterface => ({
  statusCode: 500,
  body: error,
});
