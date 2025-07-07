import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // 1. Importar o hook
import { getAulasDoAluno } from './services/api'; // 2. Usar o serviço de API

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

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Minhas Aulas</h2>
      {aulas.length > 0 ? (
        <ul>
          {aulas.map((aula) => (
            <li key={aula.id_sala || aula.id_aula} style={{ margin: '10px 0', padding: '10px', backgroundColor: '#374151', borderRadius: '6px' }}>
              {aula.disciplina} - {aula.dia_da_semana} às {aula.hora_inicio} ({aula.localizacao})
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma aula encontrada.</p>
      )}
    </div>
  );
};

export default PaginaAulas;