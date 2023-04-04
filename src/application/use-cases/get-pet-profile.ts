import { Pet, PetsInterface } from "../interfaces/pets-interface";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetPetProfileUseCaseRequest {
  id: string;
}

interface GetPetProfileUseCaseResponse {
  pet: Pet;
}

export class GetPetProfileUseCase {
  constructor(private petsInterface: PetsInterface) {}

  async execute({
    id,
  }: GetPetProfileUseCaseRequest): Promise<GetPetProfileUseCaseResponse> {
    const pet = await this.petsInterface.findById(id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return { pet };
  }
}
