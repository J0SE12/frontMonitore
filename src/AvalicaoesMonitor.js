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
        {avaliacoes.map((avaliacao) => (
          <li key={avaliacao.id}>
            Feedback: {avaliacao.feedback} - Monitor: {avaliacao.monitor_nome}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaginaAvaliacoes;
