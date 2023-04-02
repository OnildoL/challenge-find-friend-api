import fastify from "fastify";
import { applicationRoutes } from "./routes";
import { handleErrors } from "./errors/handle-errors";

export const app = fastify();

app.register(applicationRoutes);
app.setErrorHandler(handleErrors);
