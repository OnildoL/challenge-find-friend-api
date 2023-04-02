import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

export function handleErrors(
  error: FastifyError,
  _: FastifyRequest,
  response: FastifyReply
) {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  return response.status(500).send({ message: "Internal server error." });
}
