import { randomUUID } from "node:crypto";
import { Pet, PetsInterface } from "@/application/interfaces/pets-interface";

export class InMemoryPetsRepository implements PetsInterface {
  public items: Pet[] = [];

  async searchMany(query: string, page: number, filters?: Partial<Pet>) {
    const filteredItems = this.items.filter((item) => {
      if (!item.city.includes(query)) {
        return false;
      }

      if (filters?.age && item.age !== filters.age) {
        return false;
      }

      if (filters?.energy_level && item.energy_level !== filters.energy_level) {
        return false;
      }

      if (filters?.size && item.size !== filters.size) {
        return false;
      }

      if (
        filters?.level_independence &&
        item.level_independence !== filters.level_independence
      ) {
        return false;
      }

      return true;
    });

    return filteredItems.slice((page - 1) * 20, page * 20);
  }

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
