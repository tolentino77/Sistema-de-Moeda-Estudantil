# 💰 Sistema de Moeda Estudantil (Release 2 - MVP)

![Java](https://img.shields.io/badge/Java-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue)
![Next.js](https://img.shields.io/badge/Next.js-black)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED)

Este repositório contém a **segunda release (MVP)** do **Sistema de Moeda Estudantil**, desenvolvido para estimular o reconhecimento do mérito estudantil através de uma moeda virtual distribuída por professores e trocada por alunos em empresas parceiras.

## 👥 Participantes

| Integrantes | Função | GitHub |
| :--- | :--- | :--- |
| **João Vitor Tolentino** | Desenvolvedor | [@tolentino77](https://github.com/tolentino77) |
| **Thiago Lacerda** | Desenvolvedor | [@thivizinx](https://github.com/thivizinx) |
| **Victhor Ribeiro** | Desenvolvedor | [@victhorribeiro](https://github.com/victhorribeiro) |
| **Gabriel Reis** | Desenvolvedor | [@ReisBiel23](https://github.com/ReisBiel23) |
| **João Paulo C. Aramuni** | Professor Orientador | [@joaopauloaramuni](https://github.com/joaopauloaramuni) |

---

## 🚀 Guia de Instalação e Execução

Siga os passos abaixo para configurar o ambiente de desenvolvimento e executar o projeto localmente.

### 1️⃣ Pré-requisitos (O que baixar)

Certifique-se de ter as seguintes ferramentas instaladas:

* **[Java JDK 17+](https://adoptium.net/)**: Necessário para rodar a API (Spring Boot).
* **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**: Essencial para subir o banco de dados PostgreSQL via container.
* **[Node.js (LTS)](https://nodejs.org/)**: Necessário apenas se for rodar o frontend em Next.js (pasta `IDEAL`).
* **[Git](https://git-scm.com/)**: Para versionamento de código.

---

### 2️⃣ Configuração do Backend (API)

O backend gerencia as transações, usuários e regras de negócio.

#### Passo A: Configurar o Banco de Dados
Utilizamos Docker Compose para facilitar a criação do banco.

1.  Abra o terminal na pasta do backend:
    ```bash
    cd backend/moeda_estudantil
    ```
2.  Inicie o container do banco de dados:
    ```bash
    docker-compose up -d
    ```
    > **Nota:** Isso criará um banco PostgreSQL na porta `5432` (usuário: `postgres`, senha: `postgres`).

#### Passo B: Executar a Aplicação
1.  Ainda na pasta `backend/moeda_estudantil`, execute o wrapper do Maven:
    * **Windows (CMD/PowerShell):**
        ```cmd
        ./mvnw.cmd spring-boot:run
        ```
    * **Linux/Mac:**
        ```bash
        chmod +x mvnw
        ./mvnw spring-boot:run
        ```

2.  A API estará disponível em: `http://localhost:8080/api`

---

### 3️⃣ Execução do Frontend

Existem duas versões de interface disponíveis neste repositório:

#### Opção A: Protótipos Estáticos (HTML/JS)
Ideal para visualização rápida dos fluxos sem necessidade de compilação.

1.  Navegue até a pasta `html/`.
2.  Abra o arquivo `index.html` no seu navegador ou use a extensão "Live Server" do VS Code.

#### Opção B: Aplicação Moderna (Next.js)
Versão completa e reativa do sistema (código na pasta `IDEAL`).

1.  Entre na pasta do projeto:
    ```bash
    cd IDEAL
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Rode o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
4.  Acesse `http://localhost:3000` no seu navegador.

---

## 💻 Funcionalidades Principais

| Funcionalidade | Descrição | Endpoint (API) |
| :--- | :--- | :--- |
| **Autenticação** | Login diferenciado para Alunos, Professores e Empresas. | `POST /api/login` |
| **Envio de Moedas** | Professores enviam moedas aos alunos com mensagem de mérito. | `POST /api/transactions` |
| **Extrato** | Consulta de histórico de transações e saldo atual. | `GET /api/extracts` |
| **Vantagens** | Empresas cadastram produtos e descontos disponíveis. | `POST /api/advantages` |
| **Troca** | Alunos trocam moedas por vantagens e recebem cupom. | `POST /api/exchanges` |
| **Notificações** | Envio de e-mails para notificar recebimento de moedas e trocas. | *(Automático)* |

---

## 🛠 Tecnologias Utilizadas

* **Backend:** Java 17, Spring Boot, Spring Data JPA, Lombok, JavaMailSender.
* **Banco de Dados:** PostgreSQL (via Docker).
* **Frontend:** HTML5/CSS3 (Protótipo) e Next.js/TailwindCSS (Aplicação Principal).
* **Ferramentas:** Maven, Docker Compose, Git.

---

### 📧 Configuração de Email (Opcional)
Para que o envio de emails funcione localmente, configure as variáveis de ambiente `EMAIL_USERNAME` e `EMAIL_PASSWORD` no arquivo `application.properties` ou nas variáveis do seu sistema operacional. Caso contrário, verifique os logs do console para simulações de envio.
