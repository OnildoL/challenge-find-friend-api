import { InMemoryPetsRepository } from "@/infrastructure/databases/in-memory/in-memory-pets-repository";
import { SearchPetsUseCase } from "./search-pets";
import { beforeEach, describe, expect, it } from "vitest";

let petsRepository: InMemoryPetsRepository;
let sut: SearchPetsUseCase;

describe("Search Gyms usecase", () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    sut = new SearchPetsUseCase(petsRepository);
  });

  it("Should be able search for pets by city", async () => {
    await petsRepository.create({
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

    await petsRepository.create({
      name: "Getúlio",
      age: "Filhote",
      description:
        "Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.",
      energy_level: 4,
      size: "Pequenino",
      level_independence: "Médio",
      type: "Cachorro",
      breed: "Bulldog",
      environment: "Ambiente amplo",
      city: "João Pessoa",
      uf: "PB",
      requirements: [
        "Local grande para o animal correr e brincar.",
        "Proibido apartamento.",
        "Ambiente frio, pois possui muito pelo.",
        "Cão com intolerância a lactose.",
      ],
    });

    const { pets } = await sut.handle({
      query: "João Pessoa",
      page: 1,
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([expect.objectContaining({ city: "João Pessoa" })]);
  });

  it("Should be able search for pets by their traits", async () => {
    await petsRepository.create({
      name: "Alfredo",
      age: "Adulto",
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

    await petsRepository.create({
      name: "Getúlio",
      age: "Filhote",
      description:
        "Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.",
      energy_level: 4,
      size: "Pequenino",
      level_independence: "Médio",
      type: "Cachorro",
      breed: "Bulldog",
      environment: "Ambiente amplo",
      city: "João Pessoa",
      uf: "PB",
      requirements: [
        "Local grande para o animal correr e brincar.",
        "Proibido apartamento.",
        "Ambiente frio, pois possui muito pelo.",
        "Cão com intolerância a lactose.",
      ],
    });

    const { pets } = await sut.handle({
      query: "João Pessoa",
      page: 1,
      filters: {
        age: "Filhote",
        energy_level: 4,
        size: "Pequenino",
        level_independence: "Médio",
      },
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([expect.objectContaining({ name: "Getúlio" })]);
  });
});
