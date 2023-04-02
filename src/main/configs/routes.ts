import { FastifyInstance } from "fastify";
import { adaptRoute } from "../adapters/fastify-route-adapter";
import { makeCreateOrg } from "@/application/factories/make-create-org";

export async function applicationRoutes(app: FastifyInstance) {
  // Org
  app.post("/pets", adaptRoute(makeCreateOrg()));

  // Pet
}
