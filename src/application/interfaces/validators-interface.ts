import { Org } from "./orgs-interface";
import { Pet } from "./pets-interface";

interface Env {
  PORT: number;
  NODE_ENV: string;
  JWT_SECRET: string;
  DATABASE_URL: string;
  BCRYPT_ROUNDS: number;
}

interface Auth {
  email: string;
  password: string;
}

export interface Params {
  query: string;
  page: number;
  age?: "Filhote" | "Adulto";
  energy_level?: number;
  size?: "Pequenino" | "Médio" | "Grande";
  level_independence?: "Baixo" | "Médio" | "Alto";
}
export interface ValidatorInterface {
  validateProcessEnv(): Promise<Env | Error>;
  validateOrgBody(body: any): Promise<Org>;
  validatePetBody(body: any): Promise<Pet>;
  validateAuthenticate(body: any): Promise<Auth>;
  validateSearchPets(body: any): Promise<Params>;
}
