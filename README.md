# 🏢 APIs de gestão de salas de reunião - Sistema de Agendamento

Este projeto foi criado para facilitar a gestão de salas de reunião, permitindo que usuários cadastrem salas e agendem horários de forma organizada, visualizando o histórico de ocupação.

## 🛠️ Tecnologias Utilizadas
- **Ambiente de execução:** Node
- **Linguagem:** Typescript
- **ORM:** Sequelize
- **Framework:** Express
- **Banco de dados:** Postgres

## 🚀 Como Executar o Projeto

### Pré-requisitos
Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18.x ou superior)
  - Download: [https://nodejs.org/](https://nodejs.org/)
- **Gerenciador de Pacotes** (npm, yarn ou pnpm)
  - O npm vem instalado com o Node.js
- **Git** (para clonar o repositório)
  - Download: [https://git-scm.com/](https://git-scm.com/)

### 🔧 Instalação e Configuração
1. Clone este repositório:
   ```bash
   git clone [https://github.com/RuanRocha-Dev/backend-agendamento-salas-reuniao](https://github.com/RuanRocha-Dev/backend-agendamento-salas-reuniao)

2. Renomei a arquivo .env.example para -> .env <- (esta na raiz do projeto)
mantenha a mesma estrutura, mude apenas os valores para se adequarem ao seu banco de dados

2. Rode os seguintes comandos:
    
    npm install

    npm run migrations -- Não rode esse comando antes de renomear e adequar sua .env

    npm run dev

## PRONTO 🥳
Se tudo o ocorreu bem, é para você ver no console a porta que a API esta rodando.

As rotas estão na pasta: src->routes