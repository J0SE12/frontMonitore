import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNotificacoesDoAluno } from './services/api';

const PaginaNotificacoes = () => {
  const { id } = useParams(); // Obter o ID do aluno diretamente da URL
  const [notificacoes, setNotificacoes] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (id) {
      const fetchNotificacoes = async () => {
        try {
          const data = await getNotificacoesDoAluno(id);
          setNotificacoes(data);
        } catch (error) {
          setErro(error.message || 'Erro ao carregar as notificações.');
        }
      };
      fetchNotificacoes();
    }
  }, [id]);

  if (erro) return <p style={{ color: '#f87171' }}>{erro}</p>;

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Minhas Notificações</h2>
      {notificacoes.length > 0 ? (
        <ul>
          {notificacoes.map((notif) => (
            <li key={notif.id} style={{ margin: '10px 0', padding: '10px', backgroundColor: '#374151', borderRadius: '6px' }}>
              {notif.mensagem}
            </li>
          ))
        }
        </ul>
      ) : (
        <p>Nenhuma notificação nova.</p>
      )}
    </div>
  );
};

export default PaginaNotificacoes;