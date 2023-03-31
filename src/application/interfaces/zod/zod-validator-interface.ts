interface Env {
  PORT: number;
  NODE_ENV: string;
  JWT_SECRET: string;
  DATABASE_URL: string;
  BCRYPT_ROUNDS: number;
}

export interface ValidatorInterface {
  validateProcessEnv(): Promise<Env | Error>;
}
