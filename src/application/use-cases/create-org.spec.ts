import { InMemoryOrgsRepository } from "@/infrastructure/databases/in-memory/in-memory-orgs-repository";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { CreateOrgUseCase } from "./create-org";
import { makeBcryptEncoder } from "../factories/make-encoder";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: CreateOrgUseCase;

describe("Create Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = InMemoryOrgsRepository.getInstance();
    sut = new CreateOrgUseCase(orgsRepository);
  });

  it("should be able to create an organization", async () => {
    const { org } = await sut.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      cep: "00000000",
      address: "Rua do John Doe, 152",
      phone: "83900000000",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
    await orgsRepository.clearDatabase();
  });

  it("should be able to hash organization password upon registration", async () => {
    const { org } = await sut.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      cep: "00000000",
      address: "Rua do John Doe, 152",
      phone: "83900000000",
      password: "123456",
    });

    const isPassordCorrectlyHashed = await makeBcryptEncoder().compare(
      "123456",
      org.password
    );

    expect(isPassordCorrectlyHashed).toBe(true);
    await orgsRepository.clearDatabase();
  });

  it("Should not be able to register with same email twice", async () => {
    const email = "johndoe@gmail.com";

    await sut.execute({
      name: "John Doe",
      email,
      cep: "00000000",
      address: "Rua do John Doe, 152",
      phone: "83900000000",
      password: "123456",
    });

    await expect(
      sut.execute({
        name: "John Doe",
        email,
        cep: "00000000",
        address: "Rua do John Doe, 152",
        phone: "83900000000",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
