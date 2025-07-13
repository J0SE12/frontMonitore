import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAvaliacoesDoMonitor } from './services/api';

const cardStyle = { backgroundColor: '#1f2937', borderRadius: '0.75rem', padding: '1.5rem', color: '#d1d5db', marginBottom: '1rem' };
const cardTitleStyle = { fontSize: '1.25rem', fontWeight: 'bold', color: 'white', borderBottom: '1px solid #374151', paddingBottom: '0.5rem', marginBottom: '1rem' };

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
    <div style={cardStyle}>
      <h2 style={cardTitleStyle}>Avaliações Recebidas</h2>
      {erro && <p style={{color: 'red'}}>{erro}</p>}
      {avaliacoes.length > 0 ? (
        <ul>
          {avaliacoes.map((av) => (
            <li key={av.avaliacao_id} style={{ borderBottom: '1px solid #374151', padding: '1rem 0' }}>
              <p><strong>{av.aluno_nome}:</strong></p>
              <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>"{av.feedback}"</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma avaliação recebida até ao momento.</p>
      )}
    </div>
  );
};

PaginaAvaliacoes.propTypes = {
  monitorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default PaginaAvaliacoes;