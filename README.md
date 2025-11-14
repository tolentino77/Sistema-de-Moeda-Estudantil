# 💰 Sistema de Moeda Estudantil (Release 2 - MVP)

Este repositório contém a **segunda release (MVP)** do **Sistema de Moeda Estudantil**, desenvolvido na disciplina **Laboratório de Desenvolvimento de Software**, sob orientação do professor **João Paulo Carneiro Aramuni**.

---

## 🎯 Objetivo da Release 2

[cite_start]A principal meta desta fase foi a **implementação completa das regras de negócio** e dos **serviços de back-end** que suportam os casos de uso centrais do sistema (distribuição e troca de moedas), transformando a modelagem da R1 em um **MVP funcional (Minimum Viable Product)**[cite: 34].

---

## 🧩 Funcionalidades Implementadas (Core MVP)

Nesta release, as funcionalidades principais e regras de negócio foram concretizadas na API (Spring Boot):

* **Autenticação e Perfis:** Estrutura para Login para Aluno, Professor e Empresa Parceira.
* **Módulos de Cadastro (CRUD Completo na API):**
    * Cadastro de **Aluno** (com validações de unicidade de CPF, RG e E-mail).
    * Cadastro de **Professor** (com saldo inicial de **1.000 moedas por semestre**, sendo este **acumulável**, e com validações).
    * Cadastro de **Empresa Parceira** e **Vantagem/Recompensa** (com validações, descrição, foto e controle de estoque).
* **Transação (Professor -> Aluno):**
    * **Distribuição de moedas** com validação de saldo do professor e registro do motivo (mensagem obrigatória).
    * Notificação automática por **e-mail** para o aluno (moedas recebidas) e para o professor (confirmação de envio).
* **Troca de Moedas (Aluno -> Vantagem):**
    * **Resgate de Vantagens** (Coin Exchange) com validação de saldo do aluno e **controle de estoque**.
    * Dedução de saldo, geração de **Código de Resgate** e decremento do estoque.
    * Envio de **e-mail de cupom ao aluno** e **notificação ao parceiro** (ambos com o código de resgate para conferência).
* **Consultas:**
    * Endpoints para **Consulta de Saldo** e **Extrato** detalhado (Aluno e Professor).
    * Listagem de **Vantagens Disponíveis** (com estoque) para troca.

---

## 📚 Escopo da Release 2

* **Modelagem (R2 - Sequências):** Criação e atualização dos **Diagramas de Sequências** para os fluxos de Envio de Moeda, Cadastro de Vantagem e Troca de Moeda.
* **Implementação Back-end:** Finalização de todos os Services e Controllers (CRUDs e regras de negócio) para as entidades principais.
* **Comunicação:** Integração do **EmailService** com Spring Boot Mail para notificações automáticas.
* **Back-end Robusto:** Implementação de validações de dados (Jakarta Validation) e tratamento de exceções básicas (saldo insuficiente, item esgotado).
* **Front-end (Protótipo):** Entrega de todas as telas-chave do sistema como protótipo estático em HTML/CSS puro, simulando o fluxo de navegação e as funcionalidades completas do MVP (Aluno, Professor, Empresa).
* **Fundação Next.js:** Estrutura inicial do projeto *IDEAL* em Next.js/Tailwind CSS para o desenvolvimento da interface final (R3).

---

## 🧠 Tecnologias Utilizadas

* **Backend:** Java 17 com Spring Boot 3.x
    * **Dependências Chave:** Spring Boot Starter Web, Data JPA, Validation, Actuator, **Starter Mail**.
    * **Persistência:** JPA / Hibernate.
* **Banco de Dados:** PostgreSQL (Docker Compose para ambiente de dev).
* **Frontend (Protótipo Funcional):** HTML/CSS simples (`/html`).
* **Frontend (Estrutura Moderna):** Next.js 16 (IDEAL project) e Tailwind CSS.
* **Infraestrutura:** Docker e Docker Compose, Arquivo de deploy para Render.com (Backend).
* **Padrões de Projeto:** Arquitetura MVC, DTOs, Converters e Services.

---

## 🗓️ Próximas Sprints (R3 e Além)

| Sprint | Foco Principal |
|--------|----------------|
| **Sprint 03 (R2 Concluída)** | Entrega do MVP de Back-end (API) e Protótipo de Design (HTML/CSS) |
| **Sprint 04 (Início R3)** | Desenvolvimento da Interface de Usuário (Next.js/React) |
| **Sprint 05 (R3)** | Integração Front-end-Back-end e Testes E2E |

📅 **Cronograma oficial:**
[Repositório da Disciplina - Cronograma](https://github.com/joaopauloaramuni/laboratorio-de-desenvolvimento-de-software/tree/main/CRONOGRAMA)

---

## 👨‍🏫 Professor
**João Paulo Carneiro Aramuni**

---

## 🧑‍💻 Curso
**Engenharia de Software - 4º Período**
