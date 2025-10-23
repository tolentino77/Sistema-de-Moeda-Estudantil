import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Coins, Search } from "lucide-react"

export default function RewardsPage() {
  const allRewards = [
    { id: 1, title: "Vale-Presente Amazon", cost: 500, category: "Vale-Presente", image: "/amazon-gift-card.png" },
    {
      id: 2,
      title: "Fone de Ouvido Bluetooth",
      cost: 800,
      category: "Eletrônicos",
      image: "/bluetooth-headphones.png",
    },
    { id: 3, title: "Curso Online Premium", cost: 1000, category: "Educação", image: "/online-course-concept.png" },
    { id: 4, title: "Mochila Executiva", cost: 600, category: "Acessórios", image: "/executive-backpack.png" },
    { id: 5, title: "Mouse Gamer", cost: 450, category: "Eletrônicos", image: "/gaming-mouse.png" },
    { id: 6, title: "Livro Técnico", cost: 300, category: "Educação", image: "/technical-book.jpg" },
  ]

  return (
    <DashboardLayout userType="student">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Catálogo de Recompensas</h1>
          <p className="text-muted-foreground">Explore todas as recompensas disponíveis</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Buscar recompensas..." className="pl-12" />
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allRewards.map((reward) => (
            <Card key={reward.id} className="overflow-hidden group cursor-pointer">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img
                  src={reward.image || "/placeholder.svg"}
                  alt={reward.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                  {reward.category}
                </div>
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
                  Resgatar Agora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
