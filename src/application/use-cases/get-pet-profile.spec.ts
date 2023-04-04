import { InMemoryPetsRepository } from "@/infrastructure/databases/in-memory/in-memory-pets-repository";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { GetPetProfileUseCase } from "./get-pet-profile";
import { InMemoryOrgsRepository } from "@/infrastructure/databases/in-memory/in-memory-orgs-repository";
import { makeBcryptEncoder } from "../factories/make-encoder";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: GetPetProfileUseCase;

describe("Get Pet Profile Use Case", () => {
  beforeEach(() => {
    petsRepository = InMemoryPetsRepository.getInstance();
    orgsRepository = InMemoryOrgsRepository.getInstance();
    sut = new GetPetProfileUseCase(petsRepository);
  });

  afterAll(async () => {
    orgsRepository.clearDatabase();
  });

  it("should be able to get pet profile", async () => {
    const password_hash = await makeBcryptEncoder().encode("123456");

    const org = await orgsRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      cep: "00000000",
      address: "Rua do John Doe, 152",
      phone: "83900000000",
      password: password_hash,
    });

    const createdPet = await petsRepository.create({
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

    const { pet } = await sut.execute({
      petId: createdPet.id,
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.name).toEqual("Alfredo");
  });

  it("should not be able to get pet profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        petId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
