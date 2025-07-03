# Monitore.me - Frontend da Aplicação
1. Descrição
Este diretório contém o código-fonte da interface de usuário (UI) para o projeto Monitore.me. Trata-se de uma Single Page Application (SPA) desenvolvida com React, responsável por toda a interação com o usuário, incluindo login, visualização de perfis, gerenciamento de aulas e avaliações.

A aplicação consome a API RESTful fornecida pelo backend do projeto para buscar e enviar dados.

# 2. Funcionalidades Implementadas
Sistema de Autenticação Completo:

Tela de login com validação de formulário.

Gerenciamento de sessão de usuário via Context API e localStorage.

Autenticação baseada em Token (JWT) em todas as requisições para a API.

Roteamento Seguro:

Uso do react-router-dom para navegação.

Implementação de Rotas Protegidas (ProtectedRoute) que impedem o acesso de usuários não autenticados a páginas internas.

Dashboards por Papel de Usuário:

Perfil do Aluno: Uma página central que exibe dados do perfil, notificações e aulas.

Perfil do Monitor: Uma página central para o monitor gerenciar suas informações, disciplinas e salas.

Componentização Modular:

Componentes reutilizáveis para funcionalidades específicas como PaginaAulas, PaginaNotificacoes, ControlePresenca, etc.

# 3. Stack Tecnológica
Framework Principal: React (v18+)

Roteamento: React Router DOM (v6)

Gerenciamento de Estado: React Context API (para autenticação) e Hooks (useState, useEffect, useContext)

Estilização: CSS padrão (arquivo App.css)

Cliente HTTP: fetch API nativa do navegador

# 4. Como Executar o Frontend Localmente
Siga os passos abaixo para configurar e rodar a aplicação React no seu ambiente de desenvolvimento.

Pré-requisitos
Node.js (versão 16 ou superior)

npm ou yarn

O servidor backend do Monitore.me deve estar rodando em http://localhost:9000.

Passos para a Instalação
Navegue até a pasta do frontend:

# A partir da raiz do projeto principal
cd frontend

Instale as dependências:

npm install

Configure as Variáveis de Ambiente:

Renomeie o arquivo .env.example (se houver) para .env.

Abra o arquivo .env e certifique-se de que a variável REACT_APP_BACKEND_URL está apontando para o seu servidor backend:

REACT_APP_BACKEND_URL=http://localhost:9000

Se você não usar um arquivo .env, a aplicação tentará se conectar a http://localhost:9000 como fallback.

Inicie a aplicação React:

npm start

A aplicação será aberta automaticamente no seu navegador padrão, geralmente no endereço http://localhost:3000.

5. Estrutura dos Arquivos
A estrutura de pastas do projeto segue as convenções da comunidade React:

src/
├── components/      # (Sugestão) Componentes reutilizáveis (Botões, Inputs, etc.)
├── services/        # Módulo central para chamadas de API
│   └── api.js
├── App.js           # Componente principal e definição de rotas
├── AuthContext.js   # Lógica de autenticação e estado global
├── ProtectedRoute.js# Componente para proteger rotas
├── PerfilAluno.js   # Página de perfil do aluno
├── PerfilMonitor.js # Página de perfil do monitor
├── Login.js         # Página de login
└── ...              # Outros componentes de página
