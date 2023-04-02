import { makeBcryptEncoder } from "../factories/make-encoder";
import { Org, OrgsInterface } from "../interfaces/orgs-interface";
import { UseCaseInterface } from "../interfaces/use-case";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

interface CreateOrgUseCaseRequest {
  name: string;
  email: string;
  cep: string;
  address: string;
  phone: string;
  password: string;
}

interface CreateOrgUseCaseResponse {
  org: Org;
}

export class CreateOrgUseCase implements UseCaseInterface {
  constructor(private orgsInterface: OrgsInterface) {}

  async execute({
    name,
    email,
    cep,
    address,
    phone,
    password,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgWithSomeEmail = await this.orgsInterface.findByEmail(email);
    if (orgWithSomeEmail) {
      throw new OrgAlreadyExistsError();
    }
    const password_hash = await makeBcryptEncoder().encode(password);
    const org = await this.orgsInterface.create({
      name,
      email,
      cep,
      address,
      phone,
      password: password_hash,
    });
    return { org };
  }
}
