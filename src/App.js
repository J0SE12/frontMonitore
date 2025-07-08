import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Componentes de Página
import Login from "./login";
import PerfilAluno from "./PerfilAluno";
import PerfilMonitor from './PerfilMonitor';
import AvaliacaoAluno from "./avaliacaoaluno";
import PaginaAulas from "./aulasaluno";
import PaginaNotificacoes from "./PaginaNotificacoes";
import PaginaDisciplinas from './DisciplinasMonitor';
import PaginaSalas from './SalasMonitor';
import ControlePresenca from './ControlePresenca';
import PaginaAvaliacoes from './AvaliacoesMonitor';
import GerenciarAulas from './GerenciarAulas'; // 👈 Importe o componente
import BuscarAulas from './BuscarAulas';     // 👈 Importe o componente

// Componentes de Lógica
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Layout";

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
            <Route path="/aluno/aulas/:id" element={<ProtectedRoute><Layout pageTitle="Minhas Aulas"><PaginaAulas /></Layout></ProtectedRoute>} />
            <Route path="/aluno/notificacoes/:id" element={<ProtectedRoute><Layout pageTitle="Minhas Notificações"><PaginaNotificacoes /></Layout></ProtectedRoute>} />
            <Route path="/aluno/avaliar" element={<ProtectedRoute><Layout pageTitle="Avaliar Monitor"><AvaliacaoAluno /></Layout></ProtectedRoute>} />
            {/* 👇 ROTA PARA BUSCAR AULAS */}
            <Route path="/aluno/aulas/buscar" element={<ProtectedRoute><Layout pageTitle="Buscar Aulas Disponíveis"><BuscarAulas /></Layout></ProtectedRoute>} />

            {/* Rotas de Monitor */}
            <Route path="/monitor/perfil/:id" element={<ProtectedRoute><PerfilMonitor /></ProtectedRoute>} />
            <Route path="/monitor/disciplinas" element={<ProtectedRoute><Layout pageTitle="Gerir Disciplinas"><PaginaDisciplinas /></Layout></ProtectedRoute>} />
            <Route path="/monitor/salas" element={<ProtectedRoute><Layout pageTitle="Gerir Salas"><PaginaSalas /></Layout></ProtectedRoute>} />
            <Route path="/monitor/presenca" element={<ProtectedRoute><Layout pageTitle="Controle de Presença"><ControlePresenca /></Layout></ProtectedRoute>} />
            <Route path="/monitor/avaliacoes/:id" element={<ProtectedRoute><Layout pageTitle="Minhas Avaliações"><PaginaAvaliacoes /></Layout></ProtectedRoute>} />
            {/* 👇 ROTA PARA GERIR AULAS */}
            <Route path="/monitor/aulas/gerenciar" element={<ProtectedRoute><Layout pageTitle="Gerir Minhas Aulas"><GerenciarAulas /></Layout></ProtectedRoute>} />
            
            {/* Rota "Catch-all" */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;