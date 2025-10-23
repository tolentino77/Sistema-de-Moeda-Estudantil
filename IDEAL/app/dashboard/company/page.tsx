import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, TrendingUp, Users, Package } from "lucide-react"
import Link from "next/link"

export default function CompanyHomePage() {
  const stats = [
    { label: "Recompensas Ativas", value: "12", icon: Package },
    { label: "Total de Resgates", value: "248", icon: Gift },
    { label: "Alunos Alcançados", value: "1,234", icon: Users },
  ]

  return (
    <DashboardLayout userType="company">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Painel da Empresa</h1>
          <p className="text-muted-foreground">Gerencie suas recompensas e acompanhe o engajamento</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardHeader>
                  <CardDescription>{stat.label}</CardDescription>
                  <CardTitle className="text-4xl flex items-center gap-3">
                    <Icon className="w-10 h-10 text-primary" />
                    {stat.value}
                  </CardTitle>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        {/* Quick Action */}
        <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Gerenciar Recompensas</CardTitle>
            <CardDescription className="text-foreground/70">
              Adicione novas recompensas ou edite as existentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/company/manage-rewards">
              <Button variant="primary" size="lg">
                <Gift className="w-5 h-5 mr-2" />
                Gerenciar Recompensas
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Performance Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Desempenho das Recompensas</CardTitle>
            <CardDescription>Resgates nos últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Gráfico de desempenho</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
