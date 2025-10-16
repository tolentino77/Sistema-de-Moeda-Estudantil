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
import { cuponsStorage, vantagensStorage, alunosStorage, generateId } from "@/lib/local-storage"
import type { Cupom } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CuponsPage() {
  const [cupons, setCupons] = useState<Cupom[]>([])
  const [vantagens, setVantagens] = useState<any[]>([])
  const [alunos, setAlunos] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    vantagemId: "",
    alunoId: "",
    dataExpiracao: "",
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setCupons(cuponsStorage.getAll())
    setVantagens(vantagensStorage.getAll())
    setAlunos(alunosStorage.getAll())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const codigo = `CUP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    cuponsStorage.create({
      id: generateId(),
      ...formData,
      codigo,
      dataResgate: new Date().toISOString(),
      status: "ativo",
    })

    loadData()
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      vantagemId: "",
      alunoId: "",
      dataExpiracao: "",
    })
    setIsDialogOpen(false)
  }

  const getVantagemNome = (vantagemId: string) => {
    const vantagem = vantagens.find((v) => v.id === vantagemId)
    return vantagem?.nome || "N/A"
  }

  const getAlunoNome = (alunoId: string) => {
    const aluno = alunos.find((a) => a.id === alunoId)
    return aluno?.nome || "N/A"
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      ativo: "bg-green-100 text-green-800",
      usado: "bg-blue-100 text-blue-800",
      expirado: "bg-red-100 text-red-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const filteredCupons = cupons.filter(
    (cupom) =>
      cupom.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getVantagemNome(cupom.vantagemId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getAlunoNome(cupom.alunoId).toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground text-balance">Cupons</h1>
          <p className="text-muted-foreground mt-1">Gerencie os cupons de vantagens</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Cupom
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Novo Cupom</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vantagem">Vantagem</Label>
                  <Select
                    value={formData.vantagemId}
                    onValueChange={(value) => setFormData({ ...formData, vantagemId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma vantagem" />
                    </SelectTrigger>
                    <SelectContent>
                      {vantagens.map((vantagem) => (
                        <SelectItem key={vantagem.id} value={vantagem.id}>
                          {vantagem.nome} - {vantagem.custoMoedas} moedas
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aluno">Aluno</Label>
                  <Select
                    value={formData.alunoId}
                    onValueChange={(value) => setFormData({ ...formData, alunoId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um aluno" />
                    </SelectTrigger>
                    <SelectContent>
                      {alunos.map((aluno) => (
                        <SelectItem key={aluno.id} value={aluno.id}>
                          {aluno.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="dataExpiracao">Data de Expiração</Label>
                  <Input
                    id="dataExpiracao"
                    type="date"
                    value={formData.dataExpiracao}
                    onChange={(e) => setFormData({ ...formData, dataExpiracao: e.target.value })}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit">Gerar Cupom</Button>
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
                placeholder="Buscar por código, vantagem ou aluno..."
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
                <TableHead>Código</TableHead>
                <TableHead>Vantagem</TableHead>
                <TableHead>Aluno</TableHead>
                <TableHead>Data Resgate</TableHead>
                <TableHead>Data Expiração</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCupons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Nenhum cupom encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredCupons.map((cupom) => (
                  <TableRow key={cupom.id}>
                    <TableCell className="font-mono font-semibold">{cupom.codigo}</TableCell>
                    <TableCell>{getVantagemNome(cupom.vantagemId)}</TableCell>
                    <TableCell>{getAlunoNome(cupom.alunoId)}</TableCell>
                    <TableCell>{new Date(cupom.dataResgate).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>{new Date(cupom.dataExpiracao).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(cupom.status)}`}>
                        {cupom.status}
                      </span>
                    </TableCell>
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
