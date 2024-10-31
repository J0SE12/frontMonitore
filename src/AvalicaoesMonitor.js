// src/AvaliacoesMonitor.js
import React, { useEffect, useState } from "react";

const PaginaAvaliacoes = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const response = await fetch(`/api/monitor/avaliacoes/monitores`);
        const data = await response.json();
        setAvaliacoes(data);
      } catch (error) {
        console.error("Erro ao obter avaliações:", error);
      }
    };

    fetchAvaliacoes();
  }, []);

  return (
    <div>
      <h3>Avaliações dos Monitores</h3>
      <ul>
        {avaliacoes.map((avaliacoes) => (
          <li key={avaliacoes.id}>
            Feedback: {avaliacoes.feedback} - Monitor: {avaliacoes.monitor_nome}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaginaAvaliacoes;
