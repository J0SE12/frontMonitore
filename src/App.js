// Em App.js
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./login";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import PerfilAluno from "./PerfilAluno";
import AvaliacaoAluno from "./avaliacaoaluno";
import PerfilMonitor from './PerfilMonitor'; 

class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <div className="App">
            <header className="App-header">
              <h1>Bem-vindo ao Sistema de Aulas</h1>
              {/* A lógica de navegação no header pode ser removida ou ajustada,
                  pois o ProtectedRoute cuidará dos redirecionamentos de forma mais eficaz. */}
            </header>

            <Routes>
              {/* Rota Pública */}
              <Route path="/login" element={<Login />} />

              {/* Rota Raiz - Redireciona para o login */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Rotas Protegidas - Envolvidas com o componente ProtectedRoute */}
              <Route
                path="/aluno/perfil/:id"
                element={
                  <ProtectedRoute>
                    <PerfilAluno />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/avaliacao/:monitorId" // Rota corrigida para aceitar o ID do monitor
                element={
                  <ProtectedRoute>
                    <AvaliacaoAluno />
                  </ProtectedRoute>
                }
              />

              {/* 👇 ADICIONE A NOVA ROTA PROTEGIDA PARA O MONITOR */}
              <Route
                path="/monitor/perfil/:id"
                element={
                  <ProtectedRoute>
                    <PerfilMonitor />
                  </ProtectedRoute>
                }
              />
              
              {/* Rota "Catch-all" - Se o usuário digitar uma URL que não existe, redireciona para o login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;