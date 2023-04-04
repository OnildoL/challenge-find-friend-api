import { InMemoryPetsRepository } from "@/infrastructure/databases/in-memory/in-memory-pets-repository";
import { WebController } from "@/presentation/controllers/web-controller";
import { CreatePetUseCase } from "../use-cases/create-pet";
import { CreatePetController } from "@/presentation/controllers/create-pet";

const petsRepository = InMemoryPetsRepository.getInstance();

export function makeCreatePet() {
  const useCase = new CreatePetUseCase(petsRepository);
  const controller = new WebController(new CreatePetController(useCase));
  return controller;
}
