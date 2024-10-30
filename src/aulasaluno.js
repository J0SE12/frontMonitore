import React, { useEffect, useState, useCallback } from 'react';

function PaginaAulas({ alunoId }) {
  const [aulas, setAulas] = useState([]);

  const fetchAulas = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/aulas/${alunoId}`);
      const data = await response.json();
      setAulas(data);
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
    }
  }, [alunoId]);

  useEffect(() => {
    fetchAulas();
  }, [fetchAulas]);

  return (
    <div>
      <h1>Minhas Aulas</h1>
      <ul>
        {Array.isArray(aulas) && aulas.length > 0 ? (
          aulas.map((aula, index) => (
            <li key={index}>
              {`${aula.sala_nome} - ${aula.disciplina} (${aula.dia_da_semana}, ${aula.hora_inicio} - ${aula.hora_fim})`}
            </li>
          ))
        ) : (
          <li>Nenhuma aula encontrada.</li>
        )}
      </ul>
    </div>
  );
}

export default PaginaAulas;
