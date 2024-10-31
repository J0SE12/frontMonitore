// src/PaginaMonitor.js
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import PaginaPerfilMonitor from "./PerfilMonitor";
import PaginaDisciplinas from "./DisciplinasMonitor";
import PaginaSalas from "./SalasMonitor";
import PaginaAvaliacoes from "./AvalicaoesMonitor"
import ControlePresenca from "./ControlePresenca"

const PaginaMonitor = () => {
  const monitorId = 1; // ID fictício para exemplo - deve vir do contexto de autenticação

  return (
    <div>
      <h2>Página do Monitor</h2>
      <nav>
        {/* Links para navegar entre as sub-páginas do monitor */}
        <Link to="perfil">Perfil</Link>
        <Link to="disciplinas">Disciplinas</Link>
        <Link to="salas">Salas de Aula</Link>
        <Link to="avaliacoes">Avaliações</Link>
        <Link to="presencas">Presenças</Link>

      </nav>

      {/* Rotas aninhadas para sub-páginas */}
      <Routes>
        <Route path="perfil" element={<PaginaPerfilMonitor monitorId={monitorId} />} />
        <Route path="disciplinas" element={<PaginaDisciplinas monitorId={monitorId} />} />
        <Route path="salas" element={<PaginaSalas monitorId={monitorId} />} />
        <Route path="avaliacoes" element={<PaginaAvaliacoes monitorId={monitorId} />} />
        <Route path="presencas" element={<ControlePresenca monitorId={monitorId} />} />
        {/* Rota padrão ao entrar na página do monitor */}
        <Route path="/" element={<div>Bem-vindo à sua página de monitor</div>} />
      </Routes>
    </div>
  );
};

export default PaginaMonitor;
