// src/SalasMonitor.js
import React, { useEffect, useState } from "react";

const PaginaSalas = () => {
  const [salas, setSalas] = useState([]);
  const [nome, setNome] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await fetch(`/api/monitor/salas`);
        const data = await response.json();
        setSalas(data);
      } catch (error) {
        console.error("Erro ao obter salas:", error);
      }
    };

    fetchSalas();
  }, []);

  const criarSala = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/salas/criar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, capacidade, localizacao }),
      });

      if (response.ok) {
        const novaSala = await response.json();
        setSalas((prev) => [...prev, novaSala]);
        setNome("");
        setCapacidade("");
        setLocalizacao("");
        alert("Sala criada com sucesso!");
      } else {
        alert("Erro ao criar sala");
      }
    } catch (error) {
      console.error("Erro ao criar sala:", error);
    }
  };

  return (
    <div>
      <h3>Salas de Aula</h3>
      <ul>
        {salas.map((sala) => (
          <li key={sala.id}>
            {sala.nome} - Capacidade: {sala.capacidade}
          </li>
        ))}
      </ul>

      <h4>Criar Nova Sala</h4>
      <form onSubmit={criarSala}>
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
          Capacidade:
          <input
            type="number"
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Localização:
          <input
            type="text"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Criar Sala</button>
      </form>
    </div>
  );
};

export default PaginaSalas;
