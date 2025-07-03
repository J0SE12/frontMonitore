// Em PaginaNotificacoes.js
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getNotificacoesDoAluno } from './services/api'; 

function PaginaNotificacoes({ alunoId }) {
  const [notificacoes, setNotificacoes] = useState([]);
  const [error, setError] = useState(null); 

  const fetchNotificacoes = useCallback(async () => {
    setError(null); // Limpa erros anteriores
    try {
      const data = await getNotificacoesDoAluno(alunoId);
      setNotificacoes(data);
    } catch (err) {
      setError(err.message || "Erro ao buscar notificações.");
    }
  }, [alunoId]);

  useEffect(() => {
    fetchNotificacoes();
  }, [fetchNotificacoes]);

  return (
    <div>
      <h1>Minhas Notificações</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {!error && notificacoes.length > 0 ? (
          notificacoes.map((notificacao) => (
            <li key={notificacao.id}>{notificacao.mensagem}</li>
          ))
        ) : (
          !error && <li>Nenhuma notificação encontrada.</li>
        )}
      </ul>
    </div>
  );
}
PaginaNotificacoes.propTypes = {
  alunoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default PaginaNotificacoes;
