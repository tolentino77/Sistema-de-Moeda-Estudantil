// Type definitions based on UML diagram

export interface Usuario {
  id: string
  nome: string
  email: string
  cpf: string
  rg: string
  endereco: string
  tipo: "aluno" | "professor"
  instituicaoId: string
  contaId: string
}

export interface Aluno extends Usuario {
  tipo: "aluno"
  curso: string
  moedas: number
}

export interface Professor extends Usuario {
  tipo: "professor"
  departamento: string
  moedas: number
}

export interface Instituicao {
  id: string
  nome: string
  cnpj: string
  endereco: string
  telefone: string
  email: string
}

export interface Conta {
  id: string
  usuarioId: string
  saldo: number
  dataCriacao: string
}

export interface Transacao {
  id: string
  contaOrigemId: string
  contaDestinoId: string
  valor: number
  tipo: "transferencia" | "resgate" | "distribuicao"
  descricao: string
  data: string
}

export interface EmpresaParceira {
  id: string
  nome: string
  cnpj: string
  endereco: string
  telefone: string
  email: string
}

export interface Vantagem {
  id: string
  empresaParceiraId: string
  nome: string
  descricao: string
  custoMoedas: number
  foto?: string
}

export interface Cupom {
  id: string
  vantagemId: string
  codigo: string
  dataResgate: string
  dataExpiracao: string
  status: "ativo" | "usado" | "expirado"
  alunoId: string
}
