import { FastifyInstance } from "fastify";
import { adaptRoute } from "../adapters/fastify-route-adapter";
import { makeCreateOrg } from "@/application/factories/make-create-org";
import { makeCreatePet } from "@/application/factories/make-create-pet";
import { makeSignUp } from "@/application/factories/make-sign-up";
import { makeSearchPets } from "@/application/factories/make-search-pets";
import { makeGetProfile } from "@/application/factories/make-get-profile";

export async function applicationRoutes(app: FastifyInstance) {
  app.post("/sessions", adaptRoute(makeSignUp()));

  // Org
  app.post("/orgs", adaptRoute(makeCreateOrg()));

  // Pet
  app.post("/pets", adaptRoute(makeCreatePet()));
  app.get("/pets", adaptRoute(makeSearchPets()));
  app.get("/pets/:id", adaptRoute(makeGetProfile()));
}
