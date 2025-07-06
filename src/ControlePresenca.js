import React, { useEffect, useState } from "react";
// Supondo que estas funções existam no seu services/api.js
import { getDisciplinas, postPresenca } from './services/api'; 

const ControlePresenca = () => {
  const [aulas, setAulas] = useState([]); // Usaremos disciplinas para representar aulas por enquanto
  const [alunos, setAlunos] = useState([]); // Precisaria de uma rota para buscar todos os alunos
  const [aulaId, setAulaId] = useState("");
  const [alunoId, setAlunoId] = useState("");
  const [presente, setPresente] = useState(true);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aulasData = await getDisciplinas(); 
        setAulas(aulasData);
         const alunosData = await getPerfilAluno(); // Você precisaria criar este serviço e endpoint
         setAlunos(alunosData);
      } catch (error) {
        console.error("Erro ao buscar dados para presença:", error);
        setMensagem("Não foi possível carregar aulas e alunos.");
      }
    };
    fetchData();
  }, []);

  const registrarPresenca = async (e) => {
    e.preventDefault();
    setMensagem("");
    if (!aulaId || !alunoId) {
        setMensagem("Por favor, selecione uma aula e um aluno.");
        return;
    }
    try {
      const response = await postPresenca({ aulaId, alunoId, presente });
      setMensagem(response.message);
    } catch (error) {
      setMensagem(error.message || "Erro ao registrar presença.");
    }
  };

  return (
    <div>
      <h2>Controle de Presença</h2>
      <form onSubmit={registrarPresenca}>
        <label>
          Selecione a Aula:
          <select value={aulaId} onChange={(e) => setAulaId(e.target.value)} required>
            <option value="">Escolha uma aula</option>
            {aulas.map((aula) => (
              <option key={aula.id_dsc} value={aula.id_dsc}>{aula.nome}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Selecione o Aluno:
          <select value={alunoId} onChange={(e) => setAlunoId(e.target.value)} required>
            <option value="">Escolha um aluno</option>
            {/* Esta parte precisa de uma lista real de alunos vinda da API */}
            <option value="1">Aluno 1 (Exemplo)</option>
            <option value="6">Jose (Exemplo)</option>
          </select>
        </label>
        <br />
        <label>
          Presente:<input
            type="checkbox"
            checked={presente}
            onChange={(e) => setPresente(e.target.checked)}
          />
        </label>
        <br />
        <button type="submit">Registrar Presença</button>
        {mensagem && <p>{mensagem}</p>}
      </form>
    </div>
  );
};

export default ControlePresenca;