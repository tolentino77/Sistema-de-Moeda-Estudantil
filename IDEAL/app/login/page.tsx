"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AuthLayout } from "@/components/layout/auth-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, GraduationCap, Building2, User } from "lucide-react"

type UserRole = "student" | "teacher" | "company" | null

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedRole === "student") {
      router.push("/dashboard/student")
    } else if (selectedRole === "teacher") {
      router.push("/teacher")
    } else if (selectedRole === "company") {
      router.push("/company")
    }
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Coins className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Mérito Acadêmico</h1>
        <p className="text-muted-foreground text-sm">Sistema de recompensas educacionais</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Selecione seu tipo de acesso</CardDescription>
        </CardHeader>
        <CardContent>
          {!selectedRole ? (
            <div className="space-y-3">
              <button
                onClick={() => setSelectedRole("student")}
                className="w-full p-4 rounded-lg border-2 border-border bg-card hover:border-primary hover:bg-card/80 transition-all flex items-center gap-4 text-left"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Aluno</h3>
                  <p className="text-sm text-muted-foreground">Acessar meu saldo e recompensas</p>
                </div>
              </button>

              <button
                onClick={() => setSelectedRole("teacher")}
                className="w-full p-4 rounded-lg border-2 border-border bg-card hover:border-primary hover:bg-card/80 transition-all flex items-center gap-4 text-left"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Professor</h3>
                  <p className="text-sm text-muted-foreground">Atribuir pontos aos alunos</p>
                </div>
              </button>

              <button
                onClick={() => setSelectedRole("company")}
                className="w-full p-4 rounded-lg border-2 border-border bg-card hover:border-primary hover:bg-card/80 transition-all flex items-center gap-4 text-left"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Empresa</h3>
                  <p className="text-sm text-muted-foreground">Gerenciar recompensas</p>
                </div>
              </button>

              <div className="text-center text-sm text-muted-foreground pt-4">
                Não tem uma conta?{" "}
                <Link href="/register/student" className="text-primary hover:underline">
                  Cadastre-se como aluno
                </Link>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <Link href="/register/company" className="text-primary hover:underline">
                  Cadastrar empresa parceira
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-primary/10">
                {selectedRole === "student" ? (
                  <User className="w-5 h-5 text-primary" />
                ) : selectedRole === "teacher" ? (
                  <GraduationCap className="w-5 h-5 text-primary" />
                ) : (
                  <Building2 className="w-5 h-5 text-primary" />
                )}
                <span className="text-sm font-medium text-foreground">
                  Login como{" "}
                  {selectedRole === "student" ? "Aluno" : selectedRole === "teacher" ? "Professor" : "Empresa"}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="ml-auto text-xs text-primary hover:underline"
                >
                  Alterar
                </button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email ou CPF</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="seu@email.com ou 000.000.000-00"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" variant="primary">
                Entrar
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
