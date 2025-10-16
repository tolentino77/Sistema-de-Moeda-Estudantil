"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { contasStorage, alunosStorage, professoresStorage } from "@/lib/local-storage"
import type { Conta } from "@/lib/types"
import { Input } from "@/components/ui/input"

export default function ContasPage() {
  const [contas, setContas] = useState<Conta[]>([])
  const [usuarios, setUsuarios] = useState<Map<string, string>>(new Map())
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const contasData = contasStorage.getAll()
    setContas(contasData)

    // Map user IDs to names
    const alunos = alunosStorage.getAll()
    const professores = professoresStorage.getAll()
    const userMap = new Map<string, string>()

    alunos.forEach((aluno) => {
      userMap.set(aluno.contaId, aluno.nome)
    })
    professores.forEach((prof) => {
      userMap.set(prof.contaId, prof.nome)
    })

    setUsuarios(userMap)
  }

  const filteredContas = contas.filter((conta) => {
    const userName = usuarios.get(conta.id) || "Usuário não encontrado"
    return userName.toLowerCase().includes(searchTerm.toLowerCase()) || conta.id.includes(searchTerm)
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground text-balance">Contas</h1>
        <p className="text-muted-foreground mt-1">Visualize as contas dos usuários</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome de usuário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>ID da Conta</TableHead>
                <TableHead>Saldo</TableHead>
                <TableHead>Data de Criação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    Nenhuma conta encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filteredContas.map((conta) => (
                  <TableRow key={conta.id}>
                    <TableCell className="font-medium">{usuarios.get(conta.id) || "Usuário não encontrado"}</TableCell>
                    <TableCell className="font-mono text-xs">{conta.id}</TableCell>
                    <TableCell className="font-semibold">{conta.saldo} moedas</TableCell>
                    <TableCell>{new Date(conta.dataCriacao).toLocaleDateString("pt-BR")}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
