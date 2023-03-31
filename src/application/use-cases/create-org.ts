import { Org, OrgsInterface } from "../interfaces/orgs-interface";

interface CreateGymUseCaseRequest {
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

export class CreateOrgUseCase {
  constructor(private orgsInterface: OrgsInterface) {}

  async execute({
    name,
    email,
    cep,
    address,
    phone,
    password,
  }: CreateGymUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const org = await this.orgsInterface.create({
      name,
      email,
      cep,
      address,
      phone,
      password,
    });

    return { org };
  }
}
