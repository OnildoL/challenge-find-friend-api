export interface Pet {
  id?: string;
  org_id: string;
  name: string;
  age: "Filhote" | "Adulto"; // Filter
  description: string;
  energy_level: number; // Filter
  size: "Pequenino" | "Médio" | "Grande"; // Filter
  level_independence: "Baixo" | "Médio" | "Alto"; // Filter
  type: string;
  breed: string;
  environment: string;
  city: string;
  uf: string;
  requirements: string[];
}

export interface PetsInterface {
  create(data: Pet): Promise<Pet>;
  searchMany(
    query: string,
    page: number,
    filters?: Partial<Pet>
  ): Promise<Pet[]>;
}
