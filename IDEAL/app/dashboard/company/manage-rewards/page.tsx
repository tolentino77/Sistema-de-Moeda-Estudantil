"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Coins } from "lucide-react"
import { Gift } from "lucide-react" // Import the Gift component

export default function ManageRewardsPage() {
  const [rewards, setRewards] = useState([
    { id: 1, title: "Vale-Presente Amazon", cost: 500, stock: 50, active: true },
    { id: 2, title: "Fone de Ouvido Bluetooth", cost: 800, stock: 30, active: true },
    { id: 3, title: "Curso Online Premium", cost: 1000, stock: 100, active: true },
    { id: 4, title: "Mochila Executiva", cost: 600, stock: 20, active: false },
  ])

  return (
    <DashboardLayout userType="company">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Gerenciar Recompensas</h1>
            <p className="text-muted-foreground">Adicione, edite ou remova recompensas</p>
          </div>
          <Button variant="primary" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Nova Recompensa
          </Button>
        </div>

        {/* Add New Reward Form */}
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Nova Recompensa</CardTitle>
            <CardDescription>Preencha os dados da nova recompensa</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título da Recompensa</Label>
                <Input id="title" placeholder="Ex: Vale-Presente" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost">Custo em Moedas</Label>
                <Input id="cost" type="number" placeholder="Ex: 500" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Quantidade em Estoque</Label>
                <Input id="stock" type="number" placeholder="Ex: 50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Input id="category" placeholder="Ex: Vale-Presente" />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input id="description" placeholder="Descreva a recompensa..." />
              </div>

              <div className="md:col-span-2">
                <Button type="submit" variant="primary" size="lg">
                  Adicionar Recompensa
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Existing Rewards */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Recompensas Cadastradas</h2>
          <div className="grid grid-cols-1 gap-4">
            {rewards.map((reward) => (
              <Card key={reward.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <Gift className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground">{reward.title}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Coins className="w-4 h-4 text-primary" />
                            {reward.cost} moedas
                          </p>
                          <p className="text-sm text-muted-foreground">Estoque: {reward.stock}</p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              reward.active ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                            }`}
                          >
                            {reward.active ? "Ativo" : "Inativo"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-5 h-5 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
