# Grão & Byte — Frontend

Sistema de gerenciamento interno para a cafeteria **Grão & Byte**. Painel web para funcionários e administradores gerenciarem produtos e colaboradores.

## Tecnologias

- **React 19** + **TypeScript**
- **Vite** — build tool
- **React Router v7** — roteamento
- **Styled-components** — estilização
- **Axios** — requisições HTTP
- **Lucide React** — ícones

## Pré-requisitos

- Node.js v16+
- Backend da aplicação rodando (padrão: `http://127.0.0.1:5000`)

## Instalação e execução

```bash
# Clone o repositório
git clone <url-do-repo>
cd PS2JR-graobyte-frontend/frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com a URL do backend

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `frontend/` com base no `.env.example`:

```env
VITE_API_URL=http://127.0.0.1:5000
```

| Variável       | Descrição                        | Padrão                    |
|----------------|----------------------------------|---------------------------|
| `VITE_API_URL` | URL base da API do backend       | `http://127.0.0.1:5000`   |

## Scripts disponíveis

| Comando          | Descrição                              |
|------------------|----------------------------------------|
| `npm run dev`    | Inicia o servidor de desenvolvimento   |
| `npm run build`  | Gera build de produção em `./dist`     |
| `npm run preview`| Visualiza o build de produção          |
| `npm run lint`   | Verifica qualidade do código           |

## Páginas e rotas

| Rota            | Acesso       | Descrição                                      |
|-----------------|--------------|------------------------------------------------|
| `/login`        | Público      | Login com e-mail e senha                       |
| `/produtos`     | Autenticado  | Listagem e CRUD de produtos                    |
| `/funcionarios` | Admin only   | Cadastro, listagem e exclusão de funcionários  |

## Estrutura do projeto

```
frontend/
├── src/
│   ├── components/       # Componentes reutilizáveis (Navbar, Toast, Modal...)
│   ├── pages/            # Páginas da aplicação
│   │   ├── login/
│   │   ├── Produtos/
│   │   └── Funcionarios/
│   ├── services/         # Camada de comunicação com a API
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   └── produtosService.ts
│   ├── styles/           # Tema global e estilos base
│   └── App.tsx           # Configuração de rotas
├── .env.example
├── vite.config.ts
└── package.json
```

## Autenticação

- Login via e-mail e senha
- Token JWT armazenado no `localStorage`
- Interceptor Axios adiciona o token automaticamente em todas as requisições
- Redirecionamento automático para `/login` em respostas `401`
- Rotas protegidas por `PrivateRoute` (autenticado) e `AdminRoute` (admin)

## Funcionalidades

**Produtos**
- Listagem com filtros por categoria e disponibilidade
- Criar, editar e excluir produtos
- Feedback visual com toasts e estados de carregamento (skeleton)

**Funcionários** *(admin)*
- Cadastrar novos funcionários (nome, e-mail, senha)
- Listar funcionários com badge de cargo
- Excluir funcionário com confirmação

## Endpoints consumidos

```
POST   /auth/login
GET    /auth/funcionarios
POST   /auth/cadastrar-funcionario
DELETE /auth/funcionarios/:id

GET    /produtos/
POST   /produtos/
PUT    /produtos/:id
DELETE /produtos/:id
```
