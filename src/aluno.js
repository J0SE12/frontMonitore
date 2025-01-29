import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PaginaNotificacoes from "./notificacoesaluno";
import PaginaAulas from "./aulasaluno";
import PaginaAvaliacoes from "./avaliacaoaluno";

const PaginaAluno = () => {
  const { user } = useAuth(); // Obtém o usuário autenticado
  const alunoId = user?.id; // Usa o ID do aluno autenticado

  if (!alunoId) {
    return <p>Erro: ID do aluno não encontrado.</p>;
  }

  return (
    <div>
      <h2>Página do Aluno</h2>
      <nav>
        {/* Links para navegar entre as sub-páginas do aluno */}
        <Link to={`notificacoes`}>Notificações</Link>
        <Link to={`aulas`}>Minhas Aulas</Link>
        <Link to={`avaliacoes`}>Avaliar Monitor</Link>
      </nav>

      {/* Rotas aninhadas para sub-páginas */}
      <Routes>
        <Route path="notificacoes" element={<PaginaNotificacoes alunoId={alunoId} />} />
        <Route path="aulas" element={<PaginaAulas alunoId={alunoId} />} />
        <Route path="avaliacoes" element={<PaginaAvaliacoes alunoId={alunoId} />} />
        {/* Rota padrão ao entrar na página do aluno */}
        <Route path="/" element={<div>Bem-vindo à sua página de aluno</div>} />
      </Routes>
    </div>
  );
};

export default PaginaAluno;
