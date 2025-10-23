"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coins, Mail, CheckCircle, AlertCircle } from "lucide-react"

// Mock data de alunos
const mockStudents = [
  { id: 1, name: "João Silva", email: "joao@email.com", currentPoints: 120, class: "3º Ano A" },
  { id: 2, name: "Maria Santos", email: "maria@email.com", currentPoints: 85, class: "3º Ano A" },
  { id: 3, name: "Pedro Costa", email: "pedro@email.com", currentPoints: 150, class: "2º Ano B" },
  { id: 4, name: "Ana Oliveira", email: "ana@email.com", currentPoints: 95, class: "3º Ano A" },
  { id: 5, name: "Carlos Souza", email: "carlos@email.com", currentPoints: 110, class: "2º Ano B" },
  { id: 6, name: "Beatriz Lima", email: "beatriz@email.com", currentPoints: 75, class: "1º Ano C" },
]

export default function SendCoinsPage() {
  const [email, setEmail] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<(typeof mockStudents)[0] | null>(null)
  const [points, setPoints] = useState("")
  const [reason, setReason] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [emailNotFound, setEmailNotFound] = useState(false)

  const handleSearchByEmail = () => {
    const student = mockStudents.find((s) => s.email.toLowerCase() === email.toLowerCase())
    if (student) {
      setSelectedStudent(student)
      setEmailNotFound(false)
    } else {
      setSelectedStudent(null)
      setEmailNotFound(true)
    }
  }

  const handleSendPoints = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedStudent && points && reason) {
      // Simulate email notification
      console.log(`[v0] Email enviado para ${selectedStudent.email}:`)
      console.log(`[v0] Assunto: Você recebeu ${points} pontos!`)
      console.log(`[v0] Mensagem: Parabéns! Você recebeu ${points} pontos por: ${reason}`)
      console.log(`[v0] Seu novo saldo é de ${selectedStudent.currentPoints + Number.parseInt(points)} pontos.`)
      console.log(`[v0] Acesse a plataforma para resgatar suas recompensas!`)

      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setSelectedStudent(null)
        setPoints("")
        setReason("")
        setEmail("")
        setEmailNotFound(false)
      }, 3000)
    }
  }

  return (
    <DashboardLayout userType="teacher">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Atribuir Pontos</h1>
          <p className="text-muted-foreground">Digite o email do aluno e atribua pontos por mérito</p>
        </div>

        {showSuccess && (
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-green-500 font-medium">Pontos atribuídos com sucesso!</p>
              <p className="text-green-500/80 text-sm">O aluno receberá uma notificação por email</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Buscar Aluno</CardTitle>
              <CardDescription>Digite o email do aluno para atribuir pontos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email do Aluno</Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="aluno@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setEmailNotFound(false)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearchByEmail()
                      }
                    }}
                  />
                  <Button onClick={handleSearchByEmail} variant="primary">
                    Buscar
                  </Button>
                </div>
              </div>

              {emailNotFound && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-red-500 text-sm">Email não encontrado. Verifique e tente novamente.</p>
                </div>
              )}

              {selectedStudent && (
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{selectedStudent.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{selectedStudent.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedStudent.email}</p>
                      <p className="text-xs text-muted-foreground">{selectedStudent.class}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm pt-2 border-t border-primary/20">
                    <Coins className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Saldo atual:</span>
                    <span className="font-bold text-primary">{selectedStudent.currentPoints} pontos</span>
                  </div>
                </div>
              )}

              <div className="p-3 rounded-lg bg-card border border-border flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="text-foreground font-medium">Notificação Automática</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    O aluno receberá um email informando sobre os pontos recebidos e poderá acessar a plataforma para
                    resgatar recompensas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Atribuir Pontos</CardTitle>
              <CardDescription>
                {selectedStudent ? `Atribuindo pontos para ${selectedStudent.name}` : "Busque um aluno pelo email"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedStudent ? (
                <form onSubmit={handleSendPoints} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="points">Quantidade de Pontos</Label>
                    <Input
                      id="points"
                      type="number"
                      min="1"
                      placeholder="Ex: 50"
                      value={points}
                      onChange={(e) => setPoints(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Motivo da Atribuição</Label>
                    <textarea
                      id="reason"
                      className="w-full min-h-24 px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Ex: Excelente participação em sala de aula"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                    />
                  </div>

                  {points && (
                    <div className="p-4 rounded-lg bg-card border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Novo saldo do aluno:</p>
                      <p className="text-2xl font-bold text-primary">
                        {selectedStudent.currentPoints + Number.parseInt(points)} pontos
                      </p>
                    </div>
                  )}

                  <Button type="submit" className="w-full" variant="primary">
                    <Coins className="w-4 h-4 mr-2" />
                    Atribuir Pontos e Notificar
                  </Button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Mail className="w-16 h-16 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">Digite o email do aluno para começar</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
