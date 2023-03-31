import { ZodValidatorRepository } from "@/application/repositories/zod-validator-repository";

export function makeZodValidateProcessEnv() {
  const zodValidatorRepository = new ZodValidatorRepository();
  const env = zodValidatorRepository;
  return env;
}
