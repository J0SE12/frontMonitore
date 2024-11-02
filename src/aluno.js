import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import PerfilAluno from "./PerfilAluno";
import PaginaNotificacoes from "./notificacoesaluno";
import PaginaAulas from "./aulasaluno";
import PaginaAvaliacoes from "./avaliacaoaluno";

const PaginaAluno = () => {
  const alunoId = 1; // ID fictício para exemplo

  return (
    <div>
      <h2>Página do Aluno</h2>
      <nav>
        {/* Links para navegar entre as sub-páginas do aluno */}
        <Link to="perfil">Perfil</Link>
        <Link to="notificacoes">Notificações</Link>
        <Link to="aulas">Minhas Aulas</Link>
        <Link to="avaliacoes">Avaliar Monitor</Link>
        <Link to="avaliacoes">Avaliar Monitor</Link>
      </nav>

      {/* Rotas aninhadas para sub-páginas */}
      <Routes>
        <Route path="perfil" element={<PerfilAluno alunoId={alunoId} />} />
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
