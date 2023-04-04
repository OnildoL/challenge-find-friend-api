import { Pet, PetsInterface } from "../interfaces/pets-interface";
import { UseCaseInterface } from "../interfaces/use-case";

interface SearchPetsUseCaseRequest {
  query: string;
  page: number;
  filters?: {
    age: "Filhote" | "Adulto";
    energy_level: number;
    size: "Pequenino" | "Médio" | "Grande";
    level_independence: "Baixo" | "Médio" | "Alto";
  };
}

interface SearchPetsUseCaseResponse {
  pets: Pet[];
}

export class SearchPetsUseCase implements UseCaseInterface {
  constructor(private petsInterface: PetsInterface) {}

  async execute({
    query,
    page,
    filters,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsInterface.searchMany(query, page, filters);

    return { pets };
  }
}
