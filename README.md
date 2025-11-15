# 💰 Sistema de Moeda Estudantil (Release 2 - MVP)

Este repositório contém a **segunda release (MVP)** do **Sistema de Moeda Estudantil**, com o objetivo de estimular o reconhecimento do mérito estudantil por meio de uma moeda virtual distribuída por professores e trocada por alunos em empresas parceiras.

O Back-end está completo, implementando a lógica central de transações, controle de saldos, estoque de recompensas e notificação por e-mail, conforme os requisitos do projeto.

## Participantes

| Integrantes | Professores responsáveis |
| --- | --- |
| João  Vitor Tolentino ([@tolentino77](https://github.com/tolentino77)) | João Paulo Carneiro Aramuni ([@joaopauloaramuni](https://github.com/joaopauloaramuni)) |
| Thiago Lacerda ([@thivizinx](https://github.com/thivizinx)) |
| Victhor Ribeiro ([@victhorribeiro](https://github.com/victhorribeiro)) |
| Gabriel Reis ([@ReisBiel23](https://github.com/ReisBiel23)) |

## 📅 Gerenciamento do Projeto

O projeto é gerenciado por Sprints, e a **Release 2** marcou a conclusão do MVP funcional (API) e a criação dos protótipos visuais completos, conforme o cronograma do laboratório.

| Sprint | Foco Principal | Status |
| --- | --- | --- |
| **R1 (Modelagem)** | Modelagem UML (Casos de Uso, Classes, Componentes, ER) e CRUDs Iniciais. | ✅ Concluída |
| **LAB04S01** | Envio de Moedas, Consultas de Extrato e E-mails de Notificação (Prof./Aluno). | ✅ Concluída |
| **LAB04S02** | Cadastro de Vantagens (Empresa), Listagem (Aluno) e **Diagramas de Sequências (Envio/Cadastro)**. | ✅ Concluída |
| **LAB04S03** | Troca de Vantagens (Aluno) e **Diagramas de Sequências (Troca)**. | ✅ Concluída |

---

## 💻 Funcionalidades Chave do MVP (API - Spring Boot)

O core do sistema (API) em Spring Boot (Java 17) implementa todas as regras de negócio:

| Funcionalidade | Detalhes da Regra de Negócio | Endpoints Relevantes |
| --- | --- | --- |
| **Início de Saldo** | Professores recebem **1.000 moedas** a cada semestre, sendo o saldo **acumulável**. | `POST /api/professors/professor` |
| **Enviar Moedas** | Professor envia moedas com validação de saldo e motivo (mensagem obrigatória). | `POST /api/transactions/transaction` |
| **Notificação de Envio** | Aluno é notificado por **e-mail** ao receber moedas. Professor recebe confirmação. | Serviço `EmailService` |
| **Cadastrar Vantagem** | Empresa parceira cadastra Vantagens com descrição, custo e controle de **estoque**. | `POST /api/advantages/advantage` |
| **Trocar Moedas** | Aluno resgata vantagem com saldo e estoque validados. Gera **código de resgate**. | `POST /api/exchanges/exchange` |
| **Notificação de Troca** | E-mail de **cupom/código de resgate** enviado ao aluno e notificação enviada ao parceiro (ambos com o código). | Serviço `CoinExchangeService` |
| **Consultar Extrato** | Consulta do saldo total e extrato de transações/trocas para Alunos e Professores. | `GET /api/extracts/*` |

---

## 🛠 Guia de Instalação e Execução - Ambiente Dev

Este guia foca na execução do **Back-end (API)** e na visualização dos **Protótipos Estáticos** (HTML/CSS) produzidos.

### 1️⃣ Pré-requisitos  

- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-downloads.html) (Versão **17+**)  
- [Maven](https://maven.apache.org/download.cgi) (ou use o `mvnw` incluso)  
- [Docker](https://www.docker.com/products/docker-desktop) e [Docker Compose](https://docs.docker.com/compose/install/) (Para o Banco de Dados PostgreSQL)
- **Opcional:** Node.js (LTS) para rodar o Front-end `IDEAL`.

### 2️⃣ Configuração e Execução do Back-end (API)

📂 **Caminho do projeto:** `./backend/moeda_estudantil`

#### ▶️ Iniciar Banco de Dados (PostgreSQL)

Execute o Docker Compose na pasta do back-end para levantar o banco de dados:

```sh
cd backend/moeda_estudantil
docker-compose up -d postgres

```

### 🚀 Iniciar a API Spring Boot
A API será inicializada na porta 8080, e a base URL será http://localhost:8080/api.

```sh

# Na pasta ./backend/moeda_estudantil:
./mvnw spring-boot:run

```

### 🌐 Protótipos Visuais (HTML/CSS)
Os protótipos estáticos representam a interface completa do sistema, simulando o fluxo da Release 2.

| Perfil | Fluxo Principal | Arquivo de Acesso |
| --- | --- | --- |
| Aluno | Consultar Perfil e saldo| `./html/aluno/perfil.html` |
| Aluno | Visualizar e Resgatar Vantagens | `./html/aluno/trocar-moedas.html` |
| Professor | Enviar Moedas para Aluno | `./html/professor/enviar.html` |
| Empresa | Cadastro de Nova Vantagem | `./html/empresa/cadastrar-vantagem.html` |
| Geral | Login e Seleção de Perfil | `./html/login/index.html` |

### 🔨 Modelagem Documentada (R1 e R2)
A modelagem completa do sistema pode ser consultada na pasta /docs:

- Diagrama de Classes & ER (Inclui Aluno, Professor, Empresa, Vantagem, etc.)

- Diagrama de Componentes (Visão geral da arquitetura MVC)

- Diagramas de Sequência (Fluxos de Autenticação, Envio de Moedas, Cadastro e Troca de Vantagens)


### 🧪 Testes
Os testes automatizados e a verificação de código foram realizados nas seguintes camadas:

- Testes Unitários (Java): Cobertura das regras de negócio e serviços críticos (ex: dedução de saldo, validação de estoque). Arquivos de teste no diretório src/test/java.

- Verificação de Código (Next.js/TS): A etapa de build (npm run build) executa a verificação de tipos com TypeScript e qualidade de código com ESLint.

```sh

# Scipts de Build/Verificação
# No diretório do Next.js (IDEAL)
npm run build

```




