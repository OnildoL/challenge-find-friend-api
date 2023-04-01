import { Pet, PetsInterface } from "../interfaces/pets-interface";

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

export class SearchPetsUseCase {
  constructor(private petsInterface: PetsInterface) {}

  async handle({
    query,
    page,
    filters,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsInterface.searchMany(query, page, filters);

    return { pets };
  }
}
