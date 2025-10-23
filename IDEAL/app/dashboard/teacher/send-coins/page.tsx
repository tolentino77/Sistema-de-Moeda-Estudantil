"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Send, Search } from "lucide-react"

export default function SendCoinsPage() {
  const [selectedStudent, setSelectedStudent] = useState("")
  const [amount, setAmount] = useState("")
  const [reason, setReason] = useState("")

  const students = [
    { id: 1, name: "Maria Silva", class: "Turma A" },
    { id: 2, name: "João Santos", class: "Turma A" },
    { id: 3, name: "Ana Costa", class: "Turma B" },
    { id: 4, name: "Pedro Oliveira", class: "Turma B" },
    { id: 5, name: "Carla Souza", class: "Turma A" },
  ]

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de envio
    alert(`Enviando ${amount} moedas para ${selectedStudent}`)
  }

  return (
    <DashboardLayout userType="teacher">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Enviar Moedas</h1>
          <p className="text-muted-foreground">Recompense seus alunos por suas conquistas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Nova Recompensa</CardTitle>
              <CardDescription>Preencha os dados para enviar moedas</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSend} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="student">Selecionar Aluno</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="student"
                      placeholder="Buscar aluno..."
                      className="pl-10"
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Quantidade de Moedas</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Ex: 100"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Motivo da Recompensa</Label>
                  <Input
                    id="reason"
                    placeholder="Ex: Excelente participação em aula"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" variant="primary" className="w-full" size="lg">
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Moedas
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Students List */}
          <Card>
            <CardHeader>
              <CardTitle>Seus Alunos</CardTitle>
              <CardDescription>Selecione um aluno para recompensar</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
                {students.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(student.name)}
                    className={`w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors text-left ${
                      selectedStudent === student.name ? "bg-primary/10" : ""
                    }`}
                  >
                    <div>
                      <p className="font-medium text-foreground">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.class}</p>
                    </div>
                    {selectedStudent === student.name && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
