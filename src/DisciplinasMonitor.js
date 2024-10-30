// src/DisciplinasMonitor.js
import React, { useEffect, useState } from "react";

const PaginaDisciplinas = ({ monitorId }) => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const response = await fetch(`/api/monitores/disciplinas`);
        const data = await response.json();
        setDisciplinas(data);
      } catch (error) {
        console.error("Erro ao obter disciplinas:", error);
      }
    };

    fetchDisciplinas();
  }, []);

  const criarDisciplina = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/disciplinas/criar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, descricao, monitorId }),
      });

      if (response.ok) {
        const novaDisciplina = await response.json();
        setDisciplinas((prev) => [...prev, novaDisciplina]);
        setNome("");
        setDescricao("");
        alert("Disciplina criada com sucesso!");
      } else {
        alert("Erro ao criar disciplina");
      }
    } catch (error) {
      console.error("Erro ao criar disciplina:", error);
    }
  };

  return (
    <div>
      <h3>Disciplinas</h3>
      <ul>
        {disciplinas.map((disciplina) => (
          <li key={disciplina.id}>{disciplina.nome}</li>
        ))}
      </ul>

      <h4>Criar Nova Disciplina</h4>
      <form onSubmit={criarDisciplina}>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Descrição:
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Criar Disciplina</button>
      </form>
    </div>
  );
};

export default PaginaDisciplinas;
