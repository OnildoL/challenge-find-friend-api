export interface Pet {
  id?: string;
  name: string;
  age: "Filhote" | "Adulto";
  description: string;
  energy_level: number;
  size: "Pequenino" | "Médio" | "Grande";
  level_independence: "Baixo" | "Médio" | "Alto";
  type: string;
  breed: string;
  environment: string;
  city: string;
  uf: string;
  requirements: string[];
}

export interface PetsInterface {
  create(data: Pet): Promise<Pet>;
}
