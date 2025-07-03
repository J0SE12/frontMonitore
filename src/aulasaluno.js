import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getAulasDoAluno } from './services/api'; // 👈 Use o serviço

function PaginaAulas({ alunoId }) {
  const [aulas, setAulas] = useState([]);
  const [error, setError] = useState(null); // 👈 Estado para erro

  const fetchAulas = useCallback(async () => {
    setError(null); // Limpa erros anteriores
    try {
      const data = await getAulasDoAluno(alunoId);
      setAulas(data);
    } catch (err) {
      setError(err.message || "Erro ao buscar aulas.");
    }
  }, [alunoId]);

  useEffect(() => {
    fetchAulas();
  }, [fetchAulas]);

  return (
    <div>
      <h1>Minhas Aulas</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {!error && aulas.length > 0 ? (
          aulas.map((aula) => ( // Supondo que aula tenha um ID único
            <li key={aula.id_aula || aula.id}> 
              {`${aula.sala_nome} - ${aula.disciplina} (${aula.dia_da_semana}, ${aula.hora_inicio} - ${aula.hora_fim})`}
            </li>
          ))
        ) : (
          !error && <li>Nenhuma aula encontrada.</li>
        )}
      </ul>
    </div>
  );
}
PaginaAulas.propTypes = {
  alunoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default PaginaAulas;
