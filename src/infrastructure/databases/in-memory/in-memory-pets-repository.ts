import { randomUUID } from "node:crypto";
import { Pet, PetsInterface } from "@/application/interfaces/pets-interface";

export class InMemoryPetsRepository implements PetsInterface {
  public items: Pet[] = [];

  async create(data: Pet) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      age: data.age,
      description: data.description,
      energy_level: data.energy_level,
      size: data.size,
      level_independence: data.level_independence,
      type: data.type,
      breed: data.breed,
      environment: data.environment,
      city: data.city,
      uf: data.uf,
      requirements: data.requirements,
    };

    this.items.push(pet);

    return pet;
  }
}
