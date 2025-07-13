import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAulasDoAluno } from './services/api'; 

const cardStyle = { backgroundColor: '#1f2937', borderRadius: '0.75rem', padding: '1.5rem', color: '#d1d5db', marginBottom: '1rem' };
const cardTitleStyle = { fontSize: '1.25rem', fontWeight: 'bold', color: 'white', borderBottom: '1px solid #374151', paddingBottom: '0.5rem', marginBottom: '1rem' };
const aulaCardStyle = { backgroundColor: '#374151', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' };
const aulaTitleStyle = { fontSize: '1.1rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' };
const detailStyle = { color: '#d1d5db', marginBottom: '0.25rem' };


const PaginaAulas = () => {
  const { id } = useParams(); 
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (id) {
      const fetchAulas = async () => {
        setLoading(true);
        try {
          const data = await getAulasDoAluno(id);
          setAulas(data);
        } catch (error) {
          setErro(error.message || 'Erro ao carregar as aulas.');
        } finally {
          setLoading(false);
        }
      };
      fetchAulas();
    }
  }, [id]);

  // Função para formatar o horário de HH:MM:SS para HH:MM
  const formatarHorario = (inicio, fim) => {
      const h_inicio = inicio.substring(0, 5);
      const h_fim = fim.substring(0, 5);
      return `das ${h_inicio} às ${h_fim}`;
  };

  if (loading) return <div style={cardStyle}><p>Carregando aulas...</p></div>;
  if (erro) return <div style={cardStyle}><p style={{ color: '#f87171' }}>{erro}</p></div>;

  return (
    <div style={cardStyle}>
      <h2 style={cardTitleStyle}>Minhas Aulas Inscritas</h2>
      {aulas.length > 0 ? (
        aulas.map((aula) => (
          <div key={aula.id_aula} style={aulaCardStyle}>
            <h3 style={aulaTitleStyle}>{aula.titulo_aula}</h3>
            <p style={detailStyle}><strong>Disciplina:</strong> {aula.disciplina_nome}</p>
            <p style={detailStyle}><strong>Monitor:</strong> {aula.monitor_nome}</p>
            <p style={detailStyle}><strong>Local:</strong> {aula.sala_nome} ({aula.localizacao})</p>
            <p style={detailStyle}><strong>Horário:</strong> {aula.dia_da_semana}, {formatarHorario(aula.hora_inicio, aula.hora_fim)}</p>
          </div>
        ))
      ) : (
        <p>Você não está inscrito em nenhuma aula.</p>
      )}
    </div>
  );
};

export default PaginaAulas;
