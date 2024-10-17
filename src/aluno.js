import React, { useEffect, useState, useCallback } from 'react';

function PaginaAluno({ alunoId }) {
  const [presencas, setPresencas] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [monitores, setMonitores] = useState([]);
  const [monitorId, setMonitorId] = useState('');
  const [feedback, setFeedback] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Função para buscar as presenças do aluno
  const fetchPresencas = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/presencas/${alunoId}`);
      const data = await response.json();
      setPresencas(data);
    } catch (error) {
      console.error("Erro ao buscar presenças:", error);
    }
  }, [alunoId]);

  // Função para buscar as aulas que o aluno está participando
  const fetchAulas = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/aulas/${alunoId}`);
      const data = await response.json();
      setAulas(data);
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
    }
  }, [alunoId]);

  // Função para buscar os monitores disponíveis
  const fetchMonitores = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/monitores`);
      const data = await response.json();
      setMonitores(data);
    } catch (error) {
      console.error("Erro ao buscar monitores:", error);
    }
  }, []);

  // Carregar dados na montagem do componente
  useEffect(() => {
    fetchPresencas();
    fetchAulas();
    fetchMonitores();
  }, [fetchPresencas, fetchAulas, fetchMonitores]);

  return (
    <div>
      <h1>Página do Aluno</h1>

      <h2>Minhas Presenças</h2>
      <ul>
        {Array.isArray(presencas) && presencas.length > 0 ? (
          presencas.map((presenca, index) => (
            <li key={index}>{`Aula ${presenca.aula_id}: Presente - ${presenca.presente}`}</li>
          ))
        ) : (
          <li>Nenhuma presença encontrada.</li>
        )}
      </ul>

      <h2>Aulas Disponíveis</h2>
      <ul>
        {Array.isArray(aulas) && aulas.length > 0 ? (
          aulas.map((_aula, index) => (
            <li key={index}>{_aula.nome}</li>
          ))
        ) : (
          <li>Nenhuma aula disponível</li>
        )}
      </ul>

      <h2>Avaliar Monitor</h2>
      <form onSubmit={submitAvaliacao}>
        <div>
          <label htmlFor="monitor">Selecione o monitor:</label>
          <select
            id="monitor"
            value={monitorId}
            onChange={(e) => setMonitorId(e.target.value)}
          >
            <option value="">-- Selecione --</option>
            {Array.isArray(monitores) && monitores.length > 0 ? (
              monitores.map((monitor) => (
                <option key={monitor.id} value={monitor.id}>
                  {monitor.nome}
                </option>
              ))
            ) : (
              <option disabled>Nenhum monitor disponível</option>
            )}
          </select>
        </div>

        <div>
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Escreva seu feedback"
          ></textarea>
        </div>

        <button type="submit">Enviar Avaliação</button>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default PaginaAluno;
