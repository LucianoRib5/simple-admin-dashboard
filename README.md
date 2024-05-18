# simple-admin-dashboard

## Dashboard para gerenciamento de funcionários

### ⚙️ Features

- [x] Página Inicial do Dashboard
- Exibir uma tabela de funcionários com colunas para nome, cargo, departamento e ações (editar/excluir).
- Incluir um botão para adicionar um novo funcionário.
- Implementar funcionalidade de ordenação e busca na lista de funcionários.
- [x] Página de Adicionar Funcionário:
- Um formulário para adicionar um novo funcionário com campos para nome, cargo, departamento e data de admissão.
- Validar os campos do formulário antes de enviar.
- [x] Página de Editar Funcionário
- Um formulário para editar os detalhes de um funcionário existente.
- Preencher o formulário com os detalhes atuais do funcionário.
- Validar os campos do formulário antes de enviar.
- [x] API do Backend.
- endpoints RESTful para operações CRUD:
  - `GET /api/employees` - Recuperar todos os funcionários.
  - `GET /api/employees/:id` - Recuperar um único funcionário pelo ID.
  - `POST /api/employees` - Criar um novo funcionário.
  - `PUT /api/employees/:id` - Atualizar um funcionário pelo ID.
  - `DELETE /api/employees/:id` - Excluir um funcionário pelo ID.

### 🛠 Tecnologias

Ferramentas utilizadas na construção do projeto:

- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [Chakra UI](https://v2.chakra-ui.com/)

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com/), [Node.js](https://nodejs.org/en).
 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Instruções gerais

```bash
# Clone este repositório
$ git clone <https://github.com/LucianoRib5/simple-admin-dashboard.git>
```

### 🎲 Rodando o Back End (servidor)

```bash
# Acesse a pasta do projeto no terminal/cmd
$ cd simple-admin-dashboard

# Vá para a pasta server
$ cd backend

# Instale as dependências
$ npm install

# Crie um arquivo .env na raiz do projeto, com as seguintes informações (complete as aspas com seu acesso a sua database(MongoDB)):
URI = ""

# Execute o script dev
$ npm run dev

# O servidor iniciará na porta:3003.
```

### 🖥️ Rodando o Front end

```bash
# Acesse a pasta do projeto no terminal/cmd
$ cd simple-admin-dashboard

# Vá para a pasta frontend
$ cd frontend

# Instale as dependências
$ npm install

# Execute o script dev
$ npm run dev

# O servidor iniciará na porta:3000 ou acesse http://localhost:3000.
```


### Autor
---
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/89327618?v=4" width="100px;" alt=""/>
 
 <sub><b>Luciano Ribeiro</b></sub>


Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Luciano-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/luciano-ribeiro-santos/)