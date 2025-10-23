import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, ShoppingBag, Coins } from "lucide-react"

export default function StatementPage() {
  const transactions = [
    {
      id: 1,
      type: "earn",
      description: "Participação em projeto de pesquisa",
      amount: 150,
      date: "2025-01-20",
      time: "14:30",
    },
    {
      id: 2,
      type: "earn",
      description: "Nota excelente em prova de Matemática",
      amount: 200,
      date: "2025-01-18",
      time: "10:15",
    },
    {
      id: 3,
      type: "spend",
      description: "Resgate: Vale-Presente Amazon",
      amount: -500,
      date: "2025-01-17",
      time: "16:45",
    },
    { id: 4, type: "earn", description: "Ajuda a colega em trabalho", amount: 50, date: "2025-01-15", time: "11:20" },
    {
      id: 5,
      type: "earn",
      description: "Participação em evento acadêmico",
      amount: 100,
      date: "2025-01-12",
      time: "09:00",
    },
    { id: 6, type: "earn", description: "Conclusão de curso online", amount: 300, date: "2025-01-10", time: "18:30" },
    { id: 7, type: "spend", description: "Resgate: Fone de Ouvido", amount: -800, date: "2025-01-08", time: "15:10" },
    { id: 8, type: "earn", description: "Apresentação de trabalho", amount: 250, date: "2025-01-05", time: "13:45" },
  ]

  return (
    <DashboardLayout userType="student">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Extrato Completo</h1>
          <p className="text-muted-foreground">Histórico de todas as suas transações</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardDescription>Saldo Atual</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Coins className="w-8 h-8 text-primary" />
                1,250
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Total Ganho</CardDescription>
              <CardTitle className="text-3xl text-green-500">+2,350</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Total Gasto</CardDescription>
              <CardTitle className="text-3xl text-red-500">-1,100</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Transações</CardTitle>
            <CardDescription>Todas as suas movimentações de moedas</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        transaction.type === "earn" ? "bg-green-500/10" : "bg-red-500/10"
                      }`}
                    >
                      {transaction.type === "earn" ? (
                        <Award
                          className={`w-6 h-6 ${transaction.type === "earn" ? "text-green-500" : "text-red-500"}`}
                        />
                      ) : (
                        <ShoppingBag className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.date} às {transaction.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold text-lg flex items-center gap-1 ${
                        transaction.type === "earn" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount}
                      <Coins className="w-5 h-5" />
                    </p>
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
