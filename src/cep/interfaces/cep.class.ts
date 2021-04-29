import { InterCep } from './cep.interface';

export class Cep {
  getAddressByCep: (cep: string) => Promise<InterCep>;
}
