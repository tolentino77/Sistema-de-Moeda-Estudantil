"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Gift, FileText, Send, Settings, LogOut, Coins } from "lucide-react"

interface DashboardLayoutProps {
  children: ReactNode
  userType: "student" | "teacher" | "company"
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const pathname = usePathname()

  const studentLinks = [
    { href: "/dashboard/student", label: "Início", icon: Home },
    { href: "/dashboard/student/rewards", label: "Recompensas", icon: Gift },
    { href: "/dashboard/student/statement", label: "Extrato", icon: FileText },
  ]

  const teacherLinks = [
    { href: "/dashboard/teacher", label: "Início", icon: Home },
    { href: "/dashboard/teacher/send-coins", label: "Enviar Moedas", icon: Send },
  ]

  const companyLinks = [
    { href: "/dashboard/company", label: "Início", icon: Home },
    { href: "/dashboard/company/manage-rewards", label: "Gerenciar Recompensas", icon: Gift },
  ]

  const links = userType === "student" ? studentLinks : userType === "teacher" ? teacherLinks : companyLinks

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <Coins className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">Mérito</h1>
              <p className="text-xs text-muted-foreground">Acadêmico</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "text-sidebar-foreground hover:bg-sidebar-accent",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-2">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-all"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Configurações</span>
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
