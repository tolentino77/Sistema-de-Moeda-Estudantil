"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gift, Users, TrendingUp, Package } from "lucide-react"

export default function CompanyDashboard() {
  const stats = [
    {
      title: "Recompensas Ativas",
      value: "12",
      icon: Gift,
      description: "Disponíveis no catálogo",
    },
    {
      title: "Alunos Alcançados",
      value: "248",
      icon: Users,
      description: "Usuários ativos",
    },
    {
      title: "Resgates Este Mês",
      value: "34",
      icon: TrendingUp,
      description: "+12% vs mês anterior",
    },
    {
      title: "Total de Produtos",
      value: "18",
      icon: Package,
      description: "Incluindo inativos",
    },
  ]

  const topRewards = [
    { name: "Vale-Presente R$ 50", redeems: 12, points: 500 },
    { name: "Fone de Ouvido Bluetooth", redeems: 8, points: 800 },
    { name: "Mochila Executiva", redeems: 6, points: 600 },
    { name: "Kit Material Escolar", redeems: 5, points: 300 },
  ]

  return (
    <DashboardLayout role="company">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard da Empresa</h1>
          <p className="text-muted-foreground">Gerencie suas recompensas e acompanhe o engajamento</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recompensas Mais Resgatadas</CardTitle>
            <CardDescription>Top 4 produtos mais populares entre os alunos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRewards.map((reward, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-card border border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{reward.name}</p>
                      <p className="text-sm text-muted-foreground">{reward.points} pontos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{reward.redeems} resgates</p>
                    <p className="text-xs text-muted-foreground">Este mês</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
