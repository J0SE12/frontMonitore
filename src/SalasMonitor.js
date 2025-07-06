import React, { useEffect, useState } from "react";
import { getSalas, criarSala } from './services/api'; // Usando o serviço de API

const PaginaSalas = () => {
  const [salas, setSalas] = useState([]);
  const [nome, setNome] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const fetchSalas = async () => {
    try {
      const data = await getSalas();
      setSalas(data);
    } catch (error) {
      console.error("Erro ao obter salas:", error);
      setMensagem(error.message || "Erro ao carregar salas.");
    }
  };

  useEffect(() => {
    fetchSalas();
  }, []);

  const handleCriarSala = async (e) => {
    e.preventDefault();
    setMensagem("");
    try {
      await criarSala({ nome, capacidade, localizacao });
      setMensagem("Sala criada com sucesso!");
      fetchSalas(); // Atualiza a lista após a criação
      // Limpa os campos do formulário
      setNome("");
      setCapacidade("");
      setLocalizacao("");
    } catch (error) {
      setMensagem(error.message || "Erro ao criar sala.");
    }
  };

  return (
    <div>
      <h3>Salas de Aula</h3>
      <ul>
        {salas.map((sala) => (
          <li key={sala.id_sala}>
            {sala.nome} - Capacidade: {sala.capacidade} ({sala.localizacao})
          </li>
        ))}
      </ul>

      <h4>Criar Nova Sala</h4>
      <form onSubmit={handleCriarSala}>
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
        {mensagem && <p>{mensagem}</p>}
      </form>
    </div>
  );
};

export default PaginaSalas;