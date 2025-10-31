# 💰 Sistema de Moeda Estudantil (Release 1)

Este repositório contém a **primeira release** do **Sistema de Moeda Estudantil**, desenvolvido na disciplina **Laboratório de Desenvolvimento de Software**, sob orientação do professor **João Paulo Carneiro Aramuni**.

---

## 🎯 Objetivo do Projeto

O sistema tem como objetivo **estimular o reconhecimento do mérito estudantil** por meio de uma **moeda virtual**, que pode ser distribuída por professores a alunos como forma de incentivo.
Os alunos podem **trocar suas moedas** por **produtos e descontos** oferecidos por **empresas parceiras**.

---

## 🧩 Funcionalidades (Release 1)

Nesta primeira entrega, o foco está na **modelagem e estrutura inicial** do sistema, com base na **arquitetura MVC** e nos **requisitos levantados**.

As funcionalidades implementadas ou previstas na estrutura da primeira versão incluem:

* **Autenticação e Perfis:** Login para Aluno, Professor e Empresa Parceira.
* **Cadastro:**
    * Cadastro de **Aluno** (com nome, email, CPF, RG, endereço, curso e instituição).
    * Cadastro de **Professor** (com nome, email, CPF, departamento e instituição, e saldo inicial de 1.000 moedas).
    * Cadastro de **Empresa Parceira** (com nome fantasia, razão social, CNPJ e email corporativo).
    * Cadastro de **Vantagem/Recompensa** por Empresas (com nome, descrição, custo em moedas e quantidade).
* **Transações e Moedas:**
    * **Distribuição de moedas** por professores para alunos (Transação).
    * **Troca de moedas** por vantagens pelos alunos (Coin Exchange), com dedução de saldo e estoque.
* **Consultas e Visualização:**
    * **Consulta de Saldo e Extrato** (Aluno e Professor).
    * **Visualização de Vantagens** disponíveis para troca.
    * **Gerenciamento de Vantagens** por empresas (CRUD).

---

## 📚 Escopo da Release 1

* **Modelagem inicial:**
    * Diagrama de Casos de Uso
    * Histórias do Usuário
    * Diagrama de Classes
    * Diagrama de Componentes
    * Modelo Entidade-Relacionamento (ER) do Banco de Dados
* Definição da **arquitetura MVC**
* Início da **persistência de dados** (Entidades Java com JPA/Hibernate)
* **CRUDs iniciais** (Aluno e Empresa Parceira) e Controllers para as operações principais (Student, Professor, Company, Advantage, Transaction, Exchange, Extract).

---

## 🧠 Tecnologias Utilizadas

* **Backend:** Java 17 com Spring Boot 3.x
    * **Dependências:** Spring Boot Starter Web, Data JPA, Validation, Actuator.
    * **Persistência:** JPA / Hibernate.
* **Banco de Dados:** PostgreSQL (Configuração local e para produção/Render).
* **Frontend (Protótipo HTML/CSS):** HTML/CSS simples para todas as telas do sistema.
* **Frontend (IDEAL - Next.js/React):** Estrutura de projeto com Next.js e Tailwind CSS para um desenvolvimento futuro.
* **Infraestrutura:** Docker e Docker Compose para ambiente de desenvolvimento com PostgreSQL, e arquivo de deploy para Render.com.
* **Padrões de Projeto:** Arquitetura MVC, com uso de DTOs, Converters e Services (DAO/ORM).
* **Controle de Versão:** Git + GitHub.

---

## 🗓️ Planejamento das Sprints

| Sprint | Entregas Principais |
|--------|---------------------|
| **Sprint 01** | Modelagem do sistema |
| **Sprint 02** | Implementação inicial dos CRUDs (Aluno e Empresa Parceira) |
| **Sprint 03** | CRUDs finais, integração e apresentação da arquitetura |

📅 **Cronograma oficial:**
[Repositório da Disciplina - Cronograma](https://github.com/joaopauloaramuni/laboratorio-de-desenvolvimento-de-software/tree/main/CRONOGRAMA)

---

## 👨‍🏫 Professor
**João Paulo Carneiro Aramuni**

---

## 🧑‍💻 Curso
**Engenharia de Software - 4º Período**
