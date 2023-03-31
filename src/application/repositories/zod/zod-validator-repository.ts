import { ValidatorInterface } from "@/application/interfaces/zod/zod-validator-interface";
import "dotenv/config";
import { z } from "zod";

export class ZodValidatorRepository implements ValidatorInterface {
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
