import React, { useEffect, useState } from "react";
import { getDisciplinas, getAllAlunos, postPresenca } from './services/api'; 

const ControlePresenca = () => {
  const [aulas, setAulas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [aulaId, setAulaId] = useState("");
  const [alunoId, setAlunoId] = useState("");
  const [presente, setPresente] = useState(true);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aulasData, alunosData] = await Promise.all([
          getDisciplinas(),
          getAllAlunos() 
        ]);
        setAulas(aulasData);
        setAlunos(alunosData);
      } catch (error) {
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
      setMensagem(error.message || "Erro ao registar presença.");
    }
  };

  return (
    <div>
      <h2>Controle de Presença</h2>
      <form onSubmit={registrarPresenca}>
        <label>
          Selecione a Aula (Disciplina):
          <select value={aulaId} onChange={(e) => setAulaId(e.target.value)} required>
            <option value="">Escolha uma aula</option>
            {aulas.map((aula) => (
              <option key={aula.id_dsc} value={aula.id_dsc}>
                {aula.nome}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Selecione o Aluno:
          <select value={alunoId} onChange={(e) => setAlunoId(e.target.value)} required>
            <option value="">Escolha um aluno</option>
            {alunos.map((aluno) => (
              <option key={aluno.id} value={aluno.id}>
                {aluno.nome}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Presente:
          <input type="checkbox" checked={presente} onChange={(e) => setPresente(e.target.checked)} />
        </label>
        <br />
        <button type="submit">Registar Presença</button>
        {mensagem && <p>{mensagem}</p>}
      </form>
    </div>
  );
};

export default ControlePresenca;