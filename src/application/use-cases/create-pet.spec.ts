import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/infrastructure/databases/in-memory/in-memory-pets-repository";
import { CreatePetUseCase } from "./create-pet";
import { InMemoryOrgsRepository } from "@/infrastructure/databases/in-memory/in-memory-orgs-repository";
import { makeBcryptEncoder } from "../factories/make-encoder";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = InMemoryOrgsRepository.getInstance();
    sut = new CreatePetUseCase(petsRepository);
  });

  afterAll(async () => {
    orgsRepository.clearDatabase();
  });

  it("should be able to create a pet", async () => {
    const password_hash = await makeBcryptEncoder().encode("123456");

    const org = await orgsRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      cep: "00000000",
      address: "Rua do John Doe, 152",
      phone: "83900000000",
      password: password_hash,
    });

    const { pet } = await sut.execute({
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

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.org_id).toEqual(org.id);
  });
});
