import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Send, Award } from "lucide-react"
import Link from "next/link"

export default function TeacherHomePage() {
  const recentAwards = [
    { id: 1, student: "Maria Silva", amount: 150, reason: "Excelente participação", date: "2025-01-20" },
    { id: 2, student: "João Santos", amount: 200, reason: "Melhor nota da turma", date: "2025-01-19" },
    { id: 3, student: "Ana Costa", amount: 100, reason: "Ajuda aos colegas", date: "2025-01-18" },
  ]

  return (
    <DashboardLayout userType="teacher">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Painel do Professor</h1>
          <p className="text-muted-foreground">Gerencie e recompense seus alunos</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardDescription>Total de Alunos</CardDescription>
              <CardTitle className="text-4xl flex items-center gap-3">
                <Users className="w-10 h-10 text-primary" />
                45
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Moedas Distribuídas (Mês)</CardDescription>
              <CardTitle className="text-4xl text-primary">2,450</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Recompensas Enviadas</CardDescription>
              <CardTitle className="text-4xl flex items-center gap-2">
                <Award className="w-10 h-10 text-primary" />
                28
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Action */}
        <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Enviar Moedas</CardTitle>
            <CardDescription className="text-foreground/70">
              Recompense seus alunos por conquistas e bom desempenho
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/teacher/send-coins">
              <Button variant="primary" size="lg">
                <Send className="w-5 h-5 mr-2" />
                Enviar Moedas Agora
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Awards */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Recompensas Recentes</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentAwards.map((award) => (
                  <div
                    key={award.id}
                    className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{award.student}</p>
                        <p className="text-sm text-muted-foreground">{award.reason}</p>
                        <p className="text-xs text-muted-foreground">{award.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary text-lg">+{award.amount}</p>
                      <p className="text-xs text-muted-foreground">moedas</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
