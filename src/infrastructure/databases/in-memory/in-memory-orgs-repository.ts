import { randomUUID } from "node:crypto";
import { Org, OrgsInterface } from "@/application/interfaces/orgs-interface";

export class InMemoryOrgsRepository implements OrgsInterface {
  private items: Org[] = [];
  private static instance: InMemoryOrgsRepository;
  private constructor() {}

  public static getInstance(): InMemoryOrgsRepository {
    if (!InMemoryOrgsRepository.instance) {
      InMemoryOrgsRepository.instance = new InMemoryOrgsRepository();
    }
    return InMemoryOrgsRepository.instance;
  }

  public async clearDatabase() {
    return (this.items = []);
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);
    if (!org) {
      return null;
    }
    return org;
  }

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
