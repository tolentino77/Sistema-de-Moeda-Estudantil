// Local storage management for CRUD operations
import type { Aluno, Professor, Instituicao, Conta, Transacao, EmpresaParceira, Vantagem, Cupom } from "./types"

// Initialize default data
const DEFAULT_DATA = {
  alunos: [] as Aluno[],
  professores: [] as Professor[],
  instituicoes: [] as Instituicao[],
  contas: [] as Conta[],
  transacoes: [] as Transacao[],
  empresasParceiras: [] as EmpresaParceira[],
  vantagens: [] as Vantagem[],
  cupons: [] as Cupom[],
}

// Generic CRUD operations
export class LocalStorage<T extends { id: string }> {
  constructor(private key: string) {}

  getAll(): T[] {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(this.key)
    return data ? JSON.parse(data) : []
  }

  getById(id: string): T | undefined {
    return this.getAll().find((item) => item.id === id)
  }

  create(item: T): T {
    const items = this.getAll()
    items.push(item)
    localStorage.setItem(this.key, JSON.stringify(items))
    return item
  }

  update(id: string, updates: Partial<T>): T | undefined {
    const items = this.getAll()
    const index = items.findIndex((item) => item.id === id)
    if (index === -1) return undefined

    items[index] = { ...items[index], ...updates }
    localStorage.setItem(this.key, JSON.stringify(items))
    return items[index]
  }

  delete(id: string): boolean {
    const items = this.getAll()
    const filtered = items.filter((item) => item.id !== id)
    if (filtered.length === items.length) return false

    localStorage.setItem(this.key, JSON.stringify(filtered))
    return true
  }
}

// Storage instances
export const alunosStorage = new LocalStorage<Aluno>("alunos")
export const professoresStorage = new LocalStorage<Professor>("professores")
export const instituicoesStorage = new LocalStorage<Instituicao>("instituicoes")
export const contasStorage = new LocalStorage<Conta>("contas")
export const transacoesStorage = new LocalStorage<Transacao>("transacoes")
export const empresasStorage = new LocalStorage<EmpresaParceira>("empresasParceiras")
export const vantagensStorage = new LocalStorage<Vantagem>("vantagens")
export const cuponsStorage = new LocalStorage<Cupom>("cupons")

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
