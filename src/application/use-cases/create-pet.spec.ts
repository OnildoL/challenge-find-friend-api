import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/infrastructure/databases/in-memory/in-memory-pets-repository";
import { CreatePetUseCase } from "./create-pet";

let petsRepository: InMemoryPetsRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new CreatePetUseCase(petsRepository);
  });

  it("should be able to create a pet", async () => {
    const { pet } = await sut.execute({
      name: "Alfredo",
      age: "Filhote",
      description:
        "Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.",
      energy_level: 4,
      size: "Pequenino",
      level_independence: "Médio",
      type: "Cachorro",
      breed: "Bulldog",
      environment: "Ambiente amplo",
      city: "Recife",
      uf: "PE",
      requirements: [
        "Local grande para o animal correr e brincar.",
        "Proibido apartamento.",
        "Ambiente frio, pois possui muito pelo.",
        "Cão com intolerância a lactose.",
      ],
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
