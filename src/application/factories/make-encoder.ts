import { BcryptEncoderRepository } from "../repositories/bcrypt-encoder-repository";

export function makeBcryptEncoder() {
  const bcryptEncoderRepository = new BcryptEncoderRepository();
  const bcrypt = bcryptEncoderRepository;
  return bcrypt;
}
