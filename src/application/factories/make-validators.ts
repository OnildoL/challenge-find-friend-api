import { ZodValidatorRepository } from "@/application/repositories/zod-validator-repository";

export function makeValidators() {
  const zodValidatorRepository = new ZodValidatorRepository();
  const env = zodValidatorRepository;
  return env;
}
