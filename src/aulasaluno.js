import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // 1. Importar o hook
import { getAulasDoAluno } from './services/api'; // 2. Usar o serviço de API

const cardStyle = { backgroundColor: '#1f2937', borderRadius: '0.75rem', padding: '1.5rem', color: '#d1d5db', marginBottom: '1rem' };
const cardTitleStyle = { fontSize: '1.25rem', fontWeight: 'bold', color: 'white', borderBottom: '1px solid #374151', paddingBottom: '0.5rem', marginBottom: '1rem' };

const PaginaAulas = () => {
  const { id } = useParams(); // 3. Obter o ID do aluno diretamente da URL
  const [aulas, setAulas] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    // 4. Garantir que a busca só acontece se houver um ID
    if (id) {
      const fetchAulas = async () => {
        try {
          const data = await getAulasDoAluno(id);
          setAulas(data);
        } catch (error) {
          setErro(error.message || 'Erro ao carregar as aulas.');
        }
      };
      fetchAulas();
    }
  }, [id]); // A dependência agora é o ID da URL

  if (erro) return <p style={{ color: '#f87171' }}>{erro}</p>;

  if (!aulas) return <p>Carregando aulas...</p>;

  return (
    <div style={cardStyle}>
      <h2 style={cardTitleStyle}>Minhas Aulas Inscritas</h2>
      {aulas.length > 0 ? (
        <ul>
          {aulas.map((aula) => (
            <li key={aula.id_sala || aula.id_aula} style={{ borderBottom: '1px solid #374151', padding: '1rem 0' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'white' }}>{aula.disciplina}</h3>
              <p>com {aula.monitor_nome || 'Monitor'}</p>
              <p style={{fontSize: '0.9rem', color: '#9ca3af'}}>{aula.dia_da_semana}, das {aula.hora_inicio} às {aula.hora_fim} na sala {aula.localizacao}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Você não está inscrito em nenhuma aula.</p>
      )}
    </div>
  );
};

export default PaginaAulas;