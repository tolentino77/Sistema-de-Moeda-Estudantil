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

---

## 📦 Guia de Deploy (Produção)

O projeto está configurado para facilitar o deploy na plataforma **Render** (Backend e Banco de Dados) e em qualquer serviço de hospedagem estática (Frontend).

### 1️⃣ Backend e Banco de Dados (Render)

O repositório contém um arquivo `render.yaml` na pasta do backend que automatiza a infraestrutura.

1. Crie uma conta no [Render](https://render.com/).
2. No painel, clique em **New +** e selecione **Blueprint**.
3. Conecte o seu repositório do GitHub.
4. O Render irá detectar o arquivo `render.yaml` e sugerir a criação de dois serviços:
    * **moeda-estudantil-db**: Banco de dados PostgreSQL.
    * **moeda-estudantil-api**: A aplicação Spring Boot.
5. Clique em **Apply**. O Render irá provisionar o banco e iniciar o build da API.

#### Configuração de Variáveis de Ambiente
Após a criação, certifique-se de que as seguintes variáveis estão configuradas nas "Environment Variables" do serviço web (`moeda-estudantil-api`):

| Variável | Valor | Descrição |
| :--- | :--- | :--- |
| `SPRING_PROFILES_ACTIVE` | `prod` | Ativa o perfil de produção configurado no `application-prod.properties`. |
| `DATABASE_URL` | *(Automático)* | O Render preenche isto automaticamente ao ligar o DB. |
| `EMAIL_USERNAME` | `seu-email@gmail.com` | Conta Gmail para envio de notificações. |
| `EMAIL_PASSWORD` | `senha-de-app` | Senha de aplicativo (App Password) do Google. |

### 2️⃣ Frontend (Interface Web)

Como o frontend (`html/`) é composto por arquivos estáticos (HTML/CSS/JS), está sendo hospedado no **Vercel**.

#### Passo A: Configurar a URL da API
Antes de fazer o deploy, é necessário apontar o frontend para o seu backend no Render.

1. Abra os arquivos `.js` na pasta `html/js/` (ex: `auth-student.js`, `ui.js`, etc).
2. Localize a constante `API_BASE`:
   ```javascript
   // Substitua pela URL fornecida pelo Render após o deploy do backend
   const API_BASE = '[https://nome-do-seu-servico.onrender.com/api/api/](https://nome-do-seu-servico.onrender.com/api/api/)';

   #### Passo B: Deploy (Exemplo com Vercel)

1. Crie uma conta na Vercel.
2. Instale a CLI da Vercel (npm i -g vercel) ou use a interface web.
3. Se usar a interface web:

* Importe o seu repositório git.

* Nas configurações de Root Directory, selecione a pasta html.

* Clique em Deploy.
