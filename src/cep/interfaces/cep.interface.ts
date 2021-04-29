export interface InterCep {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}
