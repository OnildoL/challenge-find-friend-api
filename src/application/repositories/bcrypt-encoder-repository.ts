import { EncoderInterface } from "../interfaces/encoder-interface";
import { hash, compare } from "bcryptjs";

export class BcryptEncoderRepository implements EncoderInterface {
  async encode(password: string) {
    return await hash(password, 6);
  }

  async compare(password: string, hashed: string) {
    return await compare(password, hashed);
  }
}
