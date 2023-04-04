import { InMemoryPetsRepository } from "@/infrastructure/databases/in-memory/in-memory-pets-repository";
import { SearchPetsUseCase } from "../use-cases/search-pets";
import { WebController } from "@/presentation/controllers/web-controller";
import { SearchPetsController } from "@/presentation/controllers/search-pets";

const petsRepository = InMemoryPetsRepository.getInstance();

export function makeSearchPets() {
  const useCase = new SearchPetsUseCase(petsRepository);
  const controller = new WebController(new SearchPetsController(useCase));
  return controller;
}
