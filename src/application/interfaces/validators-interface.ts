interface Env {
  PORT: number;
  NODE_ENV: string;
  JWT_SECRET: string;
  DATABASE_URL: string;
  BCRYPT_ROUNDS: number;
}

interface Org {
  name: string;
  email: string;
  cep: string;
  address: string;
  phone: string;
  password: string;
}
export interface ValidatorInterface {
  validateProcessEnv(): Promise<Env | Error>;
  validateOrgBody(body: any): Promise<Org>;
}
