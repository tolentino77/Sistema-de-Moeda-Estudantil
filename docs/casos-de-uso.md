# 📖 Histórias de Usuário — Sistema de Moeda Estudantil

As histórias de usuário descrevem **funcionalidades vistas pela perspectiva dos usuários finais**, alinhadas ao escopo definido nos diagramas e requisitos.

## 👨‍🎓 Aluno

### US01 — Cadastrar-se no sistema
- **Como aluno**, quero me cadastrar informando meus dados pessoais e acadêmicos  
- **Para que** eu possa acessar o sistema e receber moedas.  
**Aceite:** nome, e-mail, CPF, RG, endereço, instituição e curso; evitar duplicidade de e-mail/CPF.

### US02 — Autenticar-se (login)
- **Como aluno**, quero autenticar-me com e-mail e senha  
- **Para que** eu possa acessar minha carteira e funcionalidades.  
**Aceite:** validar credenciais; bloquear acesso sem login.

### US03 — Consultar saldo e extrato
- **Como aluno**, quero consultar meu saldo de moedas e extrato  
- **Para que** eu saiba quantas moedas tenho e de onde vieram.  
**Aceite:** exibir saldo atual e histórico com data, valor e origem.

### US04 — Receber moedas
- **Como aluno**, quero receber moedas de professores  
- **Para que** meu desempenho e participação sejam reconhecidos.  
**Aceite:** creditar automaticamente e enviar e-mail notificando.

### US05 — Trocar moedas por vantagens
- **Como aluno**, quero trocar minhas moedas por vantagens cadastradas  
- **Para que** eu possa resgatar recompensas.  
**Aceite:** verificar saldo, debitar custo, gerar cupom/código, enviar e-mails para aluno e empresa.

---

## 👨‍🏫 Professor

### US06 — Autenticar-se (login)
- **Como professor**, quero autenticar-me com e-mail e senha  
- **Para que** eu possa acessar as funcionalidades de envio e controle de moedas.  
**Aceite:** validar credenciais; bloquear acesso sem login.

### US07 — Consultar extrato
- **Como professor**, quero consultar meu saldo e extrato  
- **Para que** eu possa acompanhar transações e saldo restante.  
**Aceite:** exibir histórico completo com data, valor e descrição.

### US08 — Enviar moedas a um aluno (com motivo)
- **Como professor**, quero enviar moedas a um aluno informando o motivo  
- **Para que** eu possa recompensar bom desempenho ou participação.  
**Aceite:** validar saldo; motivo obrigatório; registrar transação e enviar notificação ao aluno.  
**Obs.:** Professor recebe **1.000 moedas por semestre** (saldo acumulável).

---

## 🏢 Empresa Parceira

### US09 — Cadastrar-se como empresa parceira
- **Como empresa parceira**, quero me cadastrar no sistema  
- **Para que** eu possa oferecer vantagens aos alunos.  
**Aceite:** nome, e-mail, telefone, CNPJ, endereço e senha.

### US10 — Cadastrar vantagem (título, descrição, imagem, custo)
- **Como empresa parceira**, quero cadastrar vantagens com informações completas  
- **Para que** os alunos possam resgatá-las.  
**Aceite:** título, descrição, imagem ilustrativa, custo em moedas.

### US11 — Visualizar resgates
- **Como empresa parceira**, quero visualizar os resgates realizados por alunos  
- **Para que** eu possa validar cupons e entregar recompensas.  
**Aceite:** exibir lista de resgates com código do cupom, aluno e data.

---

## 🏛️ Instituição

### US12 — Cadastrar/validar empresas parceiras
- **Como instituição**, quero cadastrar ou validar empresas parceiras  
- **Para que** apenas parceiros confiáveis participem do sistema.  
**Aceite:** aprovar, editar ou inativar empresas; exigir CNPJ válido.
