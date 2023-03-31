import { randomUUID } from "node:crypto";
import { Org, OrgsInterface } from "@/application/interfaces/orgs-interface";

export class InMemoryOrgsRepository implements OrgsInterface {
  public items: Org[] = [];

  async create(data: Org) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      cep: data.cep,
      address: data.address,
      phone: data.phone,
      password: data.password,
    };

    this.items.push(org);

    return org;
  }
}