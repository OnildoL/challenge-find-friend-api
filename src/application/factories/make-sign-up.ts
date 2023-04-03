import { InMemoryOrgsRepository } from "@/infrastructure/databases/in-memory/in-memory-orgs-repository";
import { AuthenticateController } from "@/presentation/controllers/authenticate";
import { WebController } from "@/presentation/controllers/web-controller";
import { AuthenticateUseCase } from "../use-cases/authenticate";

const orgsRepository = InMemoryOrgsRepository.getInstance();

export function makeSignUp() {
  const useCase = new AuthenticateUseCase(orgsRepository);
  const controller = new WebController(new AuthenticateController(useCase));
  return controller;
}
