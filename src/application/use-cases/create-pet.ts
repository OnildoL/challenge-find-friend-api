import { Pet, PetsInterface } from "../interfaces/pets-interface";

interface CreatePetUseCaseRequest {
  name: string;
  age: "Filhote" | "Adulto";
  description: string;
  energy_level: number;
  size: "Pequenino" | "Médio" | "Grande";
  level_independence: "Baixo" | "Médio" | "Alto";
  type: string;
  breed: string;
  environment: string;
  city: string;
  uf: string;
  requirements: string[];
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(private petsInterface: PetsInterface) {}

  async execute({
    name,
    age,
    description,
    energy_level,
    size,
    level_independence,
    type,
    breed,
    environment,
    city,
    uf,
    requirements,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsInterface.create({
      name,
      age,
      description,
      energy_level,
      size,
      level_independence,
      type,
      breed,
      environment,
      city,
      uf,
      requirements,
    });
    return { pet };
  }
}
