"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, Users, TrendingUp, Award } from "lucide-react"

export default function TeacherDashboard() {
  const stats = [
    {
      title: "Total de Pontos Distribuídos",
      value: "2,450",
      icon: Coins,
      description: "Este mês",
    },
    {
      title: "Alunos Ativos",
      value: "48",
      icon: Users,
      description: "Suas turmas",
    },
    {
      title: "Média de Pontos",
      value: "51",
      icon: TrendingUp,
      description: "Por aluno",
    },
    {
      title: "Premiações",
      value: "12",
      icon: Award,
      description: "Este mês",
    },
  ]

  const recentAwards = [
    { student: "João Silva", points: 50, reason: "Excelente participação", date: "Hoje" },
    { student: "Maria Santos", points: 30, reason: "Trabalho bem feito", date: "Ontem" },
    { student: "Pedro Costa", points: 40, reason: "Ajudou colegas", date: "2 dias atrás" },
    { student: "Ana Oliveira", points: 25, reason: "Melhoria contínua", date: "3 dias atrás" },
  ]

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard do Professor</h1>
          <p className="text-muted-foreground">Gerencie e distribua pontos para seus alunos</p>
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
            <CardTitle>Pontuações Recentes</CardTitle>
            <CardDescription>Últimas atribuições de pontos realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAwards.map((award, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-card border border-border"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{award.student}</p>
                    <p className="text-sm text-muted-foreground">{award.reason}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">+{award.points} pontos</p>
                    <p className="text-xs text-muted-foreground">{award.date}</p>
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
