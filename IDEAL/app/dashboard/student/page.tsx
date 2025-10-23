import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins, TrendingUp, Award, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function StudentHomePage() {
  const mockRewards = [
    {
      id: 1,
      title: "Vale-Presente Amazon",
      cost: 500,
      image: "/amazon-gift-card.png",
    },
    {
      id: 2,
      title: "Fone de Ouvido Bluetooth",
      cost: 800,
      image: "/bluetooth-headphones.png",
    },
    {
      id: 3,
      title: "Curso Online Premium",
      cost: 1000,
      image: "/online-course-certificate.jpg",
    },
  ]

  const recentTransactions = [
    { id: 1, description: "Participação em projeto", amount: 150, date: "2025-01-20" },
    { id: 2, description: "Nota excelente em prova", amount: 200, date: "2025-01-18" },
    { id: 3, description: "Ajuda a colega", amount: 50, date: "2025-01-15" },
  ]

  return (
    <DashboardLayout userType="student">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Bem-vindo de volta!</h1>
          <p className="text-muted-foreground">Confira seu saldo e recompensas disponíveis</p>
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
          <CardHeader>
            <CardDescription className="text-foreground/70">Seu Saldo Atual</CardDescription>
            <CardTitle className="text-5xl font-bold flex items-center gap-3">
              <Coins className="w-12 h-12 text-primary" />
              1,250 <span className="text-2xl text-muted-foreground">moedas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>+350 moedas este mês</span>
            </div>
          </CardContent>
        </Card>

        {/* Rewards Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Resgatar Recompensas</h2>
              <p className="text-muted-foreground text-sm">Troque suas moedas por prêmios incríveis</p>
            </div>
            <Link href="/dashboard/student/rewards">
              <Button variant="secondary">
                Ver Todas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockRewards.map((reward) => (
              <Card key={reward.id} className="overflow-hidden group cursor-pointer">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img
                    src={reward.image || "/placeholder.svg"}
                    alt={reward.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{reward.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 text-primary font-semibold text-base">
                    <Coins className="w-4 h-4" />
                    {reward.cost} moedas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="primary" className="w-full">
                    Resgatar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Extrato Recente</h2>
              <p className="text-muted-foreground text-sm">Suas últimas transações</p>
            </div>
            <Link href="/dashboard/student/statement">
              <Button variant="ghost">
                Ver Completo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-500 flex items-center gap-1">
                        +{transaction.amount}
                        <Coins className="w-4 h-4" />
                      </p>
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
