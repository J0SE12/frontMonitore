import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Componentes de Página
import Login from "./login";
import PerfilAluno from "./PerfilAluno";
import PerfilMonitor from './PerfilMonitor';
import AvaliacaoAluno from "./avaliacaoaluno";
import PaginaAulas from "./aulasaluno";
import PaginaNotificacoes from "./notificacoesaluno";
import PaginaDisciplinas from './DisciplinasMonitor';
import PaginaSalas from './SalasMonitor';
import ControlePresenca from './ControlePresenca';
import PaginaAvaliacoes from './AvaliacoesMonitor';
import GerenciarAulas from './GerenciarAulas'
import BuscarAulas from './BuscarAulas'

// Componentes de Lógica
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Layout"; // Importa o nosso novo Layout

class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <Routes>
            {/* Rota Pública */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Rotas de Aluno */}
            <Route path="/aluno/perfil/:id" element={<ProtectedRoute><PerfilAluno /></ProtectedRoute>} />
            <Route path="/aluno/aulas/:id" element={<ProtectedRoute><Layout><PaginaAulas /></Layout></ProtectedRoute>} />
            <Route path="/aluno/notificacoes/:id" element={<ProtectedRoute><Layout><PaginaNotificacoes /></Layout></ProtectedRoute>} />
            <Route path="/aluno/avaliar" element={<ProtectedRoute><Layout><AvaliacaoAluno /></Layout></ProtectedRoute>} />

            {/* Rotas de Monitor */}
            <Route path="/monitor/perfil/:id" element={<ProtectedRoute><PerfilMonitor /></ProtectedRoute>} />
            <Route path="/monitor/disciplinas" element={<ProtectedRoute><Layout><PaginaDisciplinas /></Layout></ProtectedRoute>} />
            <Route path="/monitor/salas" element={<ProtectedRoute><Layout><PaginaSalas /></Layout></ProtectedRoute>} />
            <Route path="/monitor/presenca" element={<ProtectedRoute><Layout><ControlePresenca /></Layout></ProtectedRoute>} />
            <Route path="/monitor/avaliacoes/:id" element={<ProtectedRoute><Layout><PaginaAvaliacoes /></Layout></ProtectedRoute>} />
            <Route path="/monitor/gerenciar-aulas" element={<ProtectedRoute><Layout><GerenciarAulas /></Layout></ProtectedRoute>} />
            <Route path="/monitor/buscar-aulas" element={<ProtectedRoute><Layout><BuscarAulas /></Layout></ProtectedRoute>} />
            
            {/* Rota "Catch-all" */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;