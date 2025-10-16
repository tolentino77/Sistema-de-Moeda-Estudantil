"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search } from "lucide-react"
import { transacoesStorage, contasStorage, alunosStorage, professoresStorage, generateId } from "@/lib/local-storage"
import type { Transacao } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function TransacoesPage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [contas, setContas] = useState<any[]>([])
  const [usuarios, setUsuarios] = useState<Map<string, string>>(new Map())
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    contaOrigemId: "",
    contaDestinoId: "",
    valor: 0,
    tipo: "transferencia" as "transferencia" | "resgate" | "distribuicao",
    descricao: "",
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setTransacoes(transacoesStorage.getAll())
    setContas(contasStorage.getAll())

    // Map account IDs to user names
    const alunos = alunosStorage.getAll()
    const professores = professoresStorage.getAll()
    const userMap = new Map<string, string>()

    alunos.forEach((aluno) => {
      userMap.set(aluno.contaId, `${aluno.nome} (Aluno)`)
    })
    professores.forEach((prof) => {
      userMap.set(prof.contaId, `${prof.nome} (Professor)`)
    })

    setUsuarios(userMap)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Update account balances
    const contaOrigem = contasStorage.getById(formData.contaOrigemId)
    const contaDestino = contasStorage.getById(formData.contaDestinoId)

    if (contaOrigem && contaDestino) {
      if (contaOrigem.saldo >= formData.valor) {
        contasStorage.update(formData.contaOrigemId, {
          saldo: contaOrigem.saldo - formData.valor,
        })
        contasStorage.update(formData.contaDestinoId, {
          saldo: contaDestino.saldo + formData.valor,
        })

        transacoesStorage.create({
          id: generateId(),
          ...formData,
          data: new Date().toISOString(),
        })

        loadData()
        resetForm()
      } else {
        alert("Saldo insuficiente!")
      }
    }
  }

  const resetForm = () => {
    setFormData({
      contaOrigemId: "",
      contaDestinoId: "",
      valor: 0,
      tipo: "transferencia",
      descricao: "",
    })
    setIsDialogOpen(false)
  }

  const filteredTransacoes = transacoes.filter((transacao) => {
    const origemNome = usuarios.get(transacao.contaOrigemId) || ""
    const destinoNome = usuarios.get(transacao.contaDestinoId) || ""
    return (
      origemNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destinoNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transacao.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground text-balance">Transações</h1>
          <p className="text-muted-foreground mt-1">Gerencie as transações do sistema</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Transação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nova Transação</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contaOrigem">Conta Origem</Label>
                  <Select
                    value={formData.contaOrigemId}
                    onValueChange={(value) => setFormData({ ...formData, contaOrigemId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a conta origem" />
                    </SelectTrigger>
                    <SelectContent>
                      {contas.map((conta) => (
                        <SelectItem key={conta.id} value={conta.id}>
                          {usuarios.get(conta.id) || "Usuário não encontrado"} - {conta.saldo} moedas
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contaDestino">Conta Destino</Label>
                  <Select
                    value={formData.contaDestinoId}
                    onValueChange={(value) => setFormData({ ...formData, contaDestinoId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a conta destino" />
                    </SelectTrigger>
                    <SelectContent>
                      {contas.map((conta) => (
                        <SelectItem key={conta.id} value={conta.id}>
                          {usuarios.get(conta.id) || "Usuário não encontrado"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valor">Valor (moedas)</Label>
                  <Input
                    id="valor"
                    type="number"
                    value={formData.valor}
                    onChange={(e) => setFormData({ ...formData, valor: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select
                    value={formData.tipo}
                    onValueChange={(value: any) => setFormData({ ...formData, tipo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transferencia">Transferência</SelectItem>
                      <SelectItem value="resgate">Resgate</SelectItem>
                      <SelectItem value="distribuicao">Distribuição</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit">Criar Transação</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por usuário ou descrição..."
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
                <TableHead>Data</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransacoes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Nenhuma transação encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransacoes.map((transacao) => (
                  <TableRow key={transacao.id}>
                    <TableCell>{new Date(transacao.data).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>{usuarios.get(transacao.contaOrigemId) || "N/A"}</TableCell>
                    <TableCell>{usuarios.get(transacao.contaDestinoId) || "N/A"}</TableCell>
                    <TableCell className="font-semibold">{transacao.valor} moedas</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-muted">{transacao.tipo}</span>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{transacao.descricao}</TableCell>
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
