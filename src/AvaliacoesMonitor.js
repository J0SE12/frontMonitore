import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAvaliacoesDoMonitor } from './services/api';

const PaginaAvaliacoes = ({ monitorId }) => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!monitorId) return;
    const fetchAvaliacoes = async () => {
      try {
        const data = await getAvaliacoesDoMonitor(monitorId);
        setAvaliacoes(data);
      } catch (error) {
        console.error("Erro ao obter avaliações:", error);
        setErro("Erro ao obter avaliações.");
      }
    };
    fetchAvaliacoes();
  }, [monitorId]);

  return (
    <div>
      <h3>Avaliações Recebidas</h3>
      {erro && <p style={{color: 'red'}}>{erro}</p>}
      <ul>
        {avaliacoes.length > 0 ? (
          avaliacoes.map((av) => (
            <li key={av.avaliacao_id}>
              <strong>{av.aluno_nome}:</strong> "{av.feedback}"
            </li>
          ))
        ) : (
          <li>Nenhuma avaliação recebida.</li>
        )}
      </ul>
    </div>
  )
};

PaginaAvaliacoes.propTypes = {
  monitorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default PaginaAvaliacoes;
