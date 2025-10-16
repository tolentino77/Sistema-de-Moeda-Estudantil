"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, UserCircle, Building2, TrendingUp } from "lucide-react"
import {
  alunosStorage,
  professoresStorage,
  instituicoesStorage,
  transacoesStorage,
  vantagensStorage,
  cuponsStorage,
} from "@/lib/local-storage"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    alunos: 0,
    professores: 0,
    instituicoes: 0,
    transacoes: 0,
  })
  const [recentTransactions, setRecentTransactions] = useState<any[]>([])
  const [popularVantagens, setPopularVantagens] = useState<any[]>([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = () => {
    const alunos = alunosStorage.getAll()
    const professores = professoresStorage.getAll()
    const instituicoes = instituicoesStorage.getAll()
    const transacoes = transacoesStorage.getAll()
    const vantagens = vantagensStorage.getAll()
    const cupons = cuponsStorage.getAll()

    setStats({
      alunos: alunos.length,
      professores: professores.length,
      instituicoes: instituicoes.length,
      transacoes: transacoes.length,
    })

    // Get recent transactions (last 4)
    const sortedTransactions = [...transacoes]
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
      .slice(0, 4)
    setRecentTransactions(sortedTransactions)

    // Get popular vantagens (by cupom count)
    const vantagemCounts = new Map<string, number>()
    cupons.forEach((cupom) => {
      const count = vantagemCounts.get(cupom.vantagemId) || 0
      vantagemCounts.set(cupom.vantagemId, count + 1)
    })

    const vantagensWithCounts = vantagens
      .map((vantagem) => ({
        ...vantagem,
        resgates: vantagemCounts.get(vantagem.id) || 0,
      }))
      .sort((a, b) => b.resgates - a.resgates)
      .slice(0, 4)

    setPopularVantagens(vantagensWithCounts)
  }

  const getTimeAgo = (date: string) => {
    const now = new Date()
    const past = new Date(date)
    const diffInHours = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Há menos de 1 hora"
    if (diffInHours === 1) return "Há 1 hora"
    if (diffInHours < 24) return `Há ${diffInHours} horas`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return "Há 1 dia"
    return `Há ${diffInDays} dias`
  }

  const statsConfig = [
    {
      title: "Total de Alunos",
      value: stats.alunos,
      change: "+12%",
      icon: GraduationCap,
      color: "text-chart-1",
    },
    {
      title: "Total de Professores",
      value: stats.professores,
      change: "+5%",
      icon: UserCircle,
      color: "text-chart-2",
    },
    {
      title: "Instituições",
      value: stats.instituicoes,
      change: "+2",
      icon: Building2,
      color: "text-chart-3",
    },
    {
      title: "Transações",
      value: stats.transacoes,
      change: "+23%",
      icon: TrendingUp,
      color: "text-chart-4",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground text-balance">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Visão geral do sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsConfig.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className={cn("w-4 h-4", stat.color)} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-chart-4">{stat.change}</span> desde o último mês
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Nenhuma transação recente</p>
              ) : (
                recentTransactions.map((transacao) => (
                  <div
                    key={transacao.id}
                    className="flex items-center gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0"
                  >
                    <div className="w-2 h-2 rounded-full bg-chart-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{transacao.descricao || "Transação registrada"}</p>
                      <p className="text-xs text-muted-foreground">{getTimeAgo(transacao.data)}</p>
                    </div>
                    <div className="text-sm font-semibold">{transacao.valor} moedas</div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Vantagens Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularVantagens.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Nenhuma vantagem cadastrada</p>
              ) : (
                popularVantagens.map((vantagem) => (
                  <div
                    key={vantagem.id}
                    className="flex items-center justify-between pb-4 border-b border-border/50 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-medium">{vantagem.nome}</p>
                      <p className="text-xs text-muted-foreground">{vantagem.resgates} resgates</p>
                    </div>
                    <div className="text-sm font-semibold text-chart-2">{vantagem.custoMoedas} moedas</div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
