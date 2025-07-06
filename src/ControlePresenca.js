// src/ControlePresenca.js
import React, { useEffect, useState } from "react";
// Importa as funções de API necessárias
import { getDisciplinas, getAllAlunos, postPresenca } from './services/api'; 

const ControlePresenca = () => {
  const [aulas, setAulas] = useState([]);
  const [alunos, setAlunos] = useState([]); // Agora será preenchido com dados reais
  const [aulaId, setAulaId] = useState("");
  const [alunoId, setAlunoId] = useState("");
  const [presente, setPresente] = useState(true);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca os dados das aulas e dos alunos em paralelo
        const [aulasData, alunosData] = await Promise.all([
          getDisciplinas(),
          getAllAlunos() 
        ]);
        setAulas(aulasData);
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
      setMensagem(error.message || "Erro ao registar presença.");
    }
  };

  return (
    <div>
      <h2>Controle de Presença</h2>
      <form onSubmit={registrarPresenca}>
        <label htmlFor="aula-select">
          Selecione a Aula:
        </label>
        <select
          id="aula-select"
          value={aulaId}
          onChange={(e) => setAulaId(e.target.value)}
          required
        >
          <option value="">Escolha uma aula</option>
          {aulas.map((aula) => (
            <option key={aula.id_dsc} value={aula.id_dsc}>
              {aula.nome}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="aluno-select">
          Selecione o Aluno:
        </label>
        <select
          id="aluno-select"
          value={alunoId}
          onChange={(e) => setAlunoId(e.target.value)}
          required
        >
          <option value="">Escolha um aluno</option>
          {/* O seletor agora é preenchido com os alunos reais */}
          {alunos.map((aluno) => (
            <option key={aluno.id} value={aluno.id}>
              {aluno.nome}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="presente-checkbox">
          Presente:
        </label>
        <input
          id="presente-checkbox"
          type="checkbox"
          checked={presente}
          onChange={(e) => setPresente(e.target.checked)}
        />
        <br />
        <button type="submit">Registar Presença</button>
        {mensagem && <p>{mensagem}</p>}
      </form>
    </div>
  );
};

export default ControlePresenca;
