import { ValidatorInterface } from "@/application/interfaces/validators-interface";
import "dotenv/config";
import { z } from "zod";

export class ZodValidatorRepository implements ValidatorInterface {
  async validateAuthenticate(_body: any) {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });
    const body = authenticateBodySchema.parse(_body);
    return body;
  }

  async validatePetBody(_body: any) {
    const createBodySchema = z.object({
      org_id: z.string().uuid(),
      name: z.string(),
      age: z.enum(["Filhote", "Adulto"]),
      description: z.string(),
      energy_level: z.number(),
      size: z.enum(["Pequenino", "Médio", "Grande"]),
      level_independence: z.enum(["Baixo", "Médio", "Alto"]),
      type: z.string(),
      breed: z.string(),
      environment: z.string(),
      city: z.string(),
      uf: z.string(),
      requirements: z.array(z.string()),
    });
    const body = createBodySchema.parse(_body);
    return body;
  }

  async validateOrgBody(_body: any) {
    const createBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      cep: z.string(),
      address: z.string(),
      phone: z.string(),
      password: z.string().min(6),
    });
    const body = createBodySchema.parse(_body);
    return body;
  }

  async validateProcessEnv() {
    const envSchema = z.object({
      PORT: z.coerce.number().default(3000),
      NODE_ENV: z.enum(["development", "test", "production"]),
      JWT_SECRET: z.string(),
      DATABASE_URL: z.string(),
      BCRYPT_ROUNDS: z.coerce.number().default(6),
    });
    const _env = envSchema.safeParse(process.env);
    if (_env.success === false) {
      console.log("❌ Invalid environment variables", _env.error.format());
      throw new Error("Invalid environment variables");
    }
    return _env.data;
  }
}
