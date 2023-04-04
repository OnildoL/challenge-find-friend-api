import { InMemoryPetsRepository } from "@/infrastructure/databases/in-memory/in-memory-pets-repository";
import { WebController } from "@/presentation/controllers/web-controller";
import { GetPetProfileUseCase } from "../use-cases/get-pet-profile";
import { GetPetProfileController } from "@/presentation/controllers/get-pet-profile";

const petsRepository = InMemoryPetsRepository.getInstance();

export function makeGetProfile() {
  const useCase = new GetPetProfileUseCase(petsRepository);
  const controller = new WebController(new GetPetProfileController(useCase));
  return controller;
}
