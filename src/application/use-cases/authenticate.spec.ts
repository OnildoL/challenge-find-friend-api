import { InMemoryOrgsRepository } from "@/infrastructure/databases/in-memory/in-memory-orgs-repository";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { makeBcryptEncoder } from "../factories/make-encoder";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    orgsRepository = InMemoryOrgsRepository.getInstance();
    sut = new AuthenticateUseCase(orgsRepository);
  });

  it("should be able to authenticate", async () => {
    const password_hash = await makeBcryptEncoder().encode("123456");

    await orgsRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      cep: "00000000",
      address: "Rua do John Doe, 152",
      phone: "83900000000",
      password: password_hash,
    });

    const { org } = await sut.execute({
      email: "johndoe@gmail.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
    await orgsRepository.clearDatabase();
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "johndoe@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const password_hash = await makeBcryptEncoder().encode("123456");

    await orgsRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      cep: "00000000",
      address: "Rua do John Doe, 152",
      phone: "83900000000",
      password: password_hash,
    });

    await expect(() =>
      sut.execute({
        email: "johndoe@gmail.com",
        password: "1234567",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
