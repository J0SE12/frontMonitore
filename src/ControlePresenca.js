// src/ControlePresenca.js
import React, { useEffect, useState } from "react";

const ControlePresenca = () => {
  const [aulas, setAulas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [aulaId, setAulaId] = useState("");
  const [alunoId, setAlunoId] = useState("");
  const [presente, setPresente] = useState(true);

  // Buscar aulas ao carregar a página
  useEffect(() => {
    const fetchAulas = async () => {
      try {
        const response = await fetch("/api/aulas");
        const data = await response.json();
        setAulas(data);
      } catch (error) {
        console.error("Erro ao buscar aulas:", error);
      }
    };
    
    fetchAulas();
  }, []);

  // Buscar alunos ao carregar a página
  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await fetch("/api/alunos");
        const data = await response.json();
        setAlunos(data);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    };
    
    fetchAlunos();
  }, []);

  // Função para registrar presença
  const registrarPresenca = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/presencas/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ aulaId, alunoId, presente }),
      });

      if (response.ok) {
        alert("Presença registrada com sucesso!");
        // Resetar o formulário
        setAulaId("");
        setAlunoId("");
        setPresente(true);
      } else {
        alert("Erro ao registrar presença");
      }
    } catch (error) {
      console.error("Erro ao registrar presença:", error);
    }
  };

  return (
    <div>
      <h2>Controle de Presença</h2>
      <form onSubmit={registrarPresenca}>
        <label>
          Selecione a Aula:
          <select
            value={aulaId}
            onChange={(e) => setAulaId(e.target.value)}
            required
          >
            <option value="">Escolha uma aula</option>
            {aulas.map((aula) => (
              <option key={aula.id} value={aula.id}>
                {aula.nome}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Selecione o Aluno:
          <select
            value={alunoId}
            onChange={(e) => setAlunoId(e.target.value)}
            required
          >
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
          <input
            type="checkbox"
            checked={presente}
            onChange={(e) => setPresente(e.target.checked)}
          />
        </label>
        <br />
        <button type="submit">Registrar Presença</button>
      </form>
    </div>
  );
};

export default ControlePresenca;
