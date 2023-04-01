export interface EncoderInterface {
  encode(password: string): Promise<string>;
  compare(password: string, hashed: string): Promise<boolean>;
}
