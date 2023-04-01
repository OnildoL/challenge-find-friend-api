import { InMemoryPetsRepository } from "@/infrastructure/databases/in-memory/in-memory-pets-repository";
import { SearchPetsUseCase } from "./search-pets";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/infrastructure/databases/in-memory/in-memory-orgs-repository";
import { makeBcryptEncoder } from "../factories/make-encoder";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: SearchPetsUseCase;

describe("Search Gyms usecase", () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    sut = new SearchPetsUseCase(petsRepository);
  });

  it("Should be able search for pets by city", async () => {
    const password_hash = await makeBcryptEncoder().encode("123456");

    const org = await orgsRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      cep: "00000000",
      address: "Rua do John Doe, 152",
      phone: "83900000000",
      password: password_hash,
    });

    await petsRepository.create({
      org_id: org.id,
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
      org_id: org.id,
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
    const password_hash = await makeBcryptEncoder().encode("123456");

    const org = await orgsRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      cep: "00000000",
      address: "Rua do John Doe, 152",
      phone: "83900000000",
      password: password_hash,
    });

    await petsRepository.create({
      org_id: org.id,
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
      org_id: org.id,
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
