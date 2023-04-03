import { Org } from "./orgs-interface";
import { Pet } from "./pets-interface";

interface Env {
  PORT: number;
  NODE_ENV: string;
  JWT_SECRET: string;
  DATABASE_URL: string;
  BCRYPT_ROUNDS: number;
}
export interface ValidatorInterface {
  validateProcessEnv(): Promise<Env | Error>;
  validateOrgBody(body: any): Promise<Org>;
  validatePetBody(body: any): Promise<Pet>;
}
