import { FastifyInstance } from "fastify";
import { adaptRoute } from "../adapters/fastify-route-adapter";
import { makeCreateOrg } from "@/application/factories/make-create-org";
import { makeCreatePet } from "@/application/factories/make-create-pet";

export async function applicationRoutes(app: FastifyInstance) {
  // Org
  app.post("/orgs", adaptRoute(makeCreateOrg()));

  // Pet
  app.post("/pets", adaptRoute(makeCreatePet()));
}
