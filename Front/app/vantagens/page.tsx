"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { vantagensStorage, empresasStorage, generateId } from "@/lib/local-storage"
import type { Vantagem } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function VantagensPage() {
  const [vantagens, setVantagens] = useState<Vantagem[]>([])
  const [empresas, setEmpresas] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingVantagem, setEditingVantagem] = useState<Vantagem | null>(null)
  const [formData, setFormData] = useState({
    empresaParceiraId: "",
    nome: "",
    descricao: "",
    custoMoedas: 0,
    foto: "",
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setVantagens(vantagensStorage.getAll())
    setEmpresas(empresasStorage.getAll())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingVantagem) {
      vantagensStorage.update(editingVantagem.id, formData)
    } else {
      vantagensStorage.create({
        id: generateId(),
        ...formData,
      })
    }

    loadData()
    resetForm()
  }

  const handleEdit = (vantagem: Vantagem) => {
    setEditingVantagem(vantagem)
    setFormData({
      empresaParceiraId: vantagem.empresaParceiraId,
      nome: vantagem.nome,
      descricao: vantagem.descricao,
      custoMoedas: vantagem.custoMoedas,
      foto: vantagem.foto || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta vantagem?")) {
      vantagensStorage.delete(id)
      loadData()
    }
  }

  const resetForm = () => {
    setFormData({
      empresaParceiraId: "",
      nome: "",
      descricao: "",
      custoMoedas: 0,
      foto: "",
    })
    setEditingVantagem(null)
    setIsDialogOpen(false)
  }

  const getEmpresaNome = (empresaId: string) => {
    const empresa = empresas.find((e) => e.id === empresaId)
    return empresa?.nome || "N/A"
  }

  const filteredVantagens = vantagens.filter(
    (vantagem) =>
      vantagem.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vantagem.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getEmpresaNome(vantagem.empresaParceiraId).toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground text-balance">Vantagens</h1>
          <p className="text-muted-foreground mt-1">Gerencie as vantagens oferecidas</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Vantagem
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingVantagem ? "Editar Vantagem" : "Nova Vantagem"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa Parceira</Label>
                  <Select
                    value={formData.empresaParceiraId}
                    onValueChange={(value) => setFormData({ ...formData, empresaParceiraId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      {empresas.map((empresa) => (
                        <SelectItem key={empresa.id} value={empresa.id}>
                          {empresa.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="custoMoedas">Custo (moedas)</Label>
                  <Input
                    id="custoMoedas"
                    type="number"
                    value={formData.custoMoedas}
                    onChange={(e) => setFormData({ ...formData, custoMoedas: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="foto">URL da Foto</Label>
                  <Input
                    id="foto"
                    value={formData.foto}
                    onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
                    placeholder="https://..."
                  />
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
                <Button type="submit">{editingVantagem ? "Atualizar" : "Criar"}</Button>
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
                placeholder="Buscar por nome, descrição ou empresa..."
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
                <TableHead>Nome</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Custo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVantagens.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Nenhuma vantagem encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filteredVantagens.map((vantagem) => (
                  <TableRow key={vantagem.id}>
                    <TableCell className="font-medium">{vantagem.nome}</TableCell>
                    <TableCell>{getEmpresaNome(vantagem.empresaParceiraId)}</TableCell>
                    <TableCell className="max-w-xs truncate">{vantagem.descricao}</TableCell>
                    <TableCell className="font-semibold">{vantagem.custoMoedas} moedas</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(vantagem)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(vantagem.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
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
