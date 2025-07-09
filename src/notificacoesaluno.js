import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNotificacoesDoAluno } from './services/api';

const cardStyle = { backgroundColor: '#1f2937', borderRadius: '0.75rem', padding: '1.5rem', color: '#d1d5db', marginBottom: '1rem' };
const cardTitleStyle = { fontSize: '1.25rem', fontWeight: 'bold', color: 'white', borderBottom: '1px solid #374151', paddingBottom: '0.5rem', marginBottom: '1rem' };

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

  

   return (
    <div style={cardStyle}>
      <h2 style={cardTitleStyle}>Minhas Notificações</h2>
      {notificacoes.length > 0 ? (
        <ul>
          {notificacoes.map((notif) => (
            <li key={notif.id} style={{ borderBottom: '1px solid #374151', padding: '1rem 0' }}>
              {notif.mensagem}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma notificação nova.</p>
      )}
    </div>
  );
};

export default PaginaNotificacoes;