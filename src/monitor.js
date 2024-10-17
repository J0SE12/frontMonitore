import React, { useEffect, useState } from 'react';

function paginamonitor({ monitorId }) {
  const [perfil, setPerfil] = useState(null);
  const [disciplinas, setDisciplinas] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);

  // Função para buscar o perfil do monitor
  const fetchPerfil = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/perfil/${monitorId}`);
      const data = await response.json();
      setPerfil(data);
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
    }
  };

  // Função para buscar disciplinas do monitor
  const fetchDisciplinas = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/disciplinas`);
      const data = await response.json();
      setDisciplinas(data);
    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
    }
  };

  // Função para buscar avaliações do monitor
  const fetchAvaliacoes = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/avaliacoes/monitores`);
      const data = await response.json();
      setAvaliacoes(data);
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    }
  };

  // Carregar dados na montagem do componente
  useEffect(() => {
    fetchPerfil();
    fetchDisciplinas();
    fetchAvaliacoes();
  }, []);

  return (
    <div>
      <h1>Página do Monitor</h1>

      {perfil && (
        <div>
          <h2>Perfil</h2>
          <p>Nome: {perfil.nome}</p>
          <p>Email: {perfil.email}</p>
          <p>Criado em: {new Date(perfil.criado_em).toLocaleDateString()}</p>
        </div>
      )}

      <h2>Disciplinas</h2>
      <ul>
        {disciplinas.map((disciplina, index) => (
          <li key={index}>{disciplina.nome}</li>
        ))}
      </ul>

      <h2>Avaliações</h2>
      <ul>
        {avaliacoes.map((avaliacao, index) => (
          <li key={index}>{`Feedback: ${avaliacao.feedback}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default paginamonitor;
