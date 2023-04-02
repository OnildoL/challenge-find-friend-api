import { ValidatorInterface } from "@/application/interfaces/validators-interface";
import "dotenv/config";
import { z } from "zod";

export class ZodValidatorRepository implements ValidatorInterface {
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
