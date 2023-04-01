export interface Org {
  id?: string;
  name: string;
  email: string;
  cep: string;
  address: string;
  phone: string;
  password: string;
}

export interface OrgsInterface {
  create(data: Org): Promise<Org>;
  findByEmail(email: string): Promise<Org | null>;
}
