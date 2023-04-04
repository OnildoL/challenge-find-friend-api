import { HttpRequestInterface } from "@/application/interfaces/http-request";
import { WebController } from "@/presentation/controllers/web-controller";
import { FastifyReply, FastifyRequest } from "fastify";

export const adaptRoute = (controller: WebController) => {
  return async (request: FastifyRequest, response: FastifyReply) => {
    const httpRequest: HttpRequestInterface = {
      body: request.body,
      query: request.query,
      params: request.params,
    };
    const httpResponse = await controller.execute(httpRequest);
    response.status(httpResponse.statusCode).send(httpResponse.body);
  };
};
