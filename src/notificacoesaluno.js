import React, { useEffect, useState, useCallback } from 'react';

function PaginaNotificacoes({ alunoId }) {
  const [notificacoes, setNotificacoes] = useState([]);

  const fetchNotificacoes = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notificacoes/${alunoId}`);
      const data = await response.json();
      setNotificacoes(data);
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    }
  }, [alunoId]);

  useEffect(() => {
    fetchNotificacoes();
  }, [fetchNotificacoes]);

  return (
    <div>
      <h1>Minhas Notificações</h1>
      <ul>
        {Array.isArray(notificacoes) && notificacoes.length > 0 ? (
          notificacoes.map((notificacao, index) => (
            <li key={index}>{notificacao.mensagem}</li>
          ))
        ) : (
          <li>Nenhuma notificação encontrada.</li>
        )}
      </ul>
    </div>
  );
}

export default PaginaNotificacoes;
