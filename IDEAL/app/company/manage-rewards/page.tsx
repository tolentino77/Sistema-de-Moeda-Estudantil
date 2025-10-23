"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Gift, Plus, Edit, Trash2, CheckCircle } from "lucide-react"

type Reward = {
  id: number
  name: string
  description: string
  points: number
  stock: number
  active: boolean
}

const initialRewards: Reward[] = [
  {
    id: 1,
    name: "Vale-Presente R$ 50",
    description: "Vale para usar em nossa loja",
    points: 500,
    stock: 20,
    active: true,
  },
  {
    id: 2,
    name: "Fone de Ouvido Bluetooth",
    description: "Fone sem fio com cancelamento de ruído",
    points: 800,
    stock: 15,
    active: true,
  },
  {
    id: 3,
    name: "Mochila Executiva",
    description: "Mochila resistente para notebook",
    points: 600,
    stock: 10,
    active: true,
  },
  {
    id: 4,
    name: "Kit Material Escolar",
    description: "Kit completo de materiais",
    points: 300,
    stock: 30,
    active: true,
  },
]

export default function ManageRewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>(initialRewards)
  const [showForm, setShowForm] = useState(false)
  const [editingReward, setEditingReward] = useState<Reward | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    points: "",
    stock: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingReward) {
      setRewards(
        rewards.map((r) =>
          r.id === editingReward.id
            ? { ...r, ...formData, points: Number.parseInt(formData.points), stock: Number.parseInt(formData.stock) }
            : r,
        ),
      )
    } else {
      const newReward: Reward = {
        id: Math.max(...rewards.map((r) => r.id)) + 1,
        name: formData.name,
        description: formData.description,
        points: Number.parseInt(formData.points),
        stock: Number.parseInt(formData.stock),
        active: true,
      }
      setRewards([...rewards, newReward])
    }

    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
    resetForm()
  }

  const resetForm = () => {
    setFormData({ name: "", description: "", points: "", stock: "" })
    setShowForm(false)
    setEditingReward(null)
  }

  const handleEdit = (reward: Reward) => {
    setEditingReward(reward)
    setFormData({
      name: reward.name,
      description: reward.description,
      points: reward.points.toString(),
      stock: reward.stock.toString(),
    })
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    setRewards(rewards.filter((r) => r.id !== id))
  }

  const toggleActive = (id: number) => {
    setRewards(rewards.map((r) => (r.id === id ? { ...r, active: !r.active } : r)))
  }

  return (
    <DashboardLayout role="company">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Gerenciar Recompensas</h1>
            <p className="text-muted-foreground">Crie e gerencie as recompensas disponíveis para os alunos</p>
          </div>
          <Button variant="primary" onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Recompensa
          </Button>
        </div>

        {showSuccess && (
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-green-500 font-medium">
              Recompensa {editingReward ? "atualizada" : "criada"} com sucesso!
            </p>
          </div>
        )}

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>{editingReward ? "Editar Recompensa" : "Nova Recompensa"}</CardTitle>
              <CardDescription>Preencha os dados da recompensa que será oferecida aos alunos</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome da Recompensa</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Vale-Presente R$ 50"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="points">Custo em Pontos</Label>
                    <Input
                      id="points"
                      type="number"
                      min="1"
                      placeholder="Ex: 500"
                      value={formData.points}
                      onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <textarea
                    id="description"
                    className="w-full min-h-20 px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Descreva a recompensa..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Quantidade em Estoque</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    placeholder="Ex: 20"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" variant="primary" className="flex-1">
                    {editingReward ? "Atualizar" : "Criar"} Recompensa
                  </Button>
                  <Button type="button" variant="secondary" onClick={resetForm}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <Card key={reward.id} className={!reward.active ? "opacity-60" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{reward.name}</CardTitle>
                    <CardDescription className="mt-2">{reward.description}</CardDescription>
                  </div>
                  <Gift className="w-5 h-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">{reward.points}</p>
                    <p className="text-xs text-muted-foreground">pontos</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">{reward.stock}</p>
                    <p className="text-xs text-muted-foreground">em estoque</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" onClick={() => handleEdit(reward)} className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Editar
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => toggleActive(reward.id)} className="flex-1">
                    {reward.active ? "Desativar" : "Ativar"}
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => handleDelete(reward.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>

                {!reward.active && <p className="text-xs text-muted-foreground text-center">Recompensa desativada</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
