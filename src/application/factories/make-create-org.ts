import { InMemoryOrgsRepository } from "@/infrastructure/databases/in-memory/in-memory-orgs-repository";
import { CreateOrgUseCase } from "../use-cases/create-org";
import { CreateOrgController } from "@/presentation/controllers/create-org";
import { WebController } from "@/presentation/controllers/web-controller";

const orgsRepository = InMemoryOrgsRepository.getInstance();

export function makeCreateOrg() {
  const useCase = new CreateOrgUseCase(orgsRepository);
  const controller = new WebController(new CreateOrgController(useCase));
  return controller;
}
