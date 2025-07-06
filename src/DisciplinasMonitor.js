import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getDisciplinas, criarDisciplina } from './services/api';

const PaginaDisciplinas = ({ monitorId }) => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const fetchDisciplinas = async () => {
    try {
      const data = await getDisciplinas();
      setDisciplinas(data);
    } catch (error) {
      setMensagem(error.message);
    }
  };

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  const handleCriarDisciplina = async (e) => {
    e.preventDefault();
    setMensagem("");
    try {
      await criarDisciplina({ nome, descricao, monitorId });
      setMensagem("Disciplina criada com sucesso!");
      fetchDisciplinas(); // Atualiza a lista
      setNome("");
      setDescricao("");
    } catch (error) {
      setMensagem(error.message || "Erro ao criar disciplina.");
    }
  };

  return (
    <div>
      <h3>Disciplinas Ministradas</h3>
      <ul>
        {disciplinas.map((d) => <li key={d.id_dsc}>{d.nome}</li>)}
      </ul>
      <h4>Criar Nova Disciplina</h4>
      <form onSubmit={handleCriarDisciplina}>
        <label>Nome: <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required /></label>
        <br />
        <label>Descrição: <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required /></label>
        <br />
        <button type="submit">Criar Disciplina</button>
        {mensagem && <p>{mensagem}</p>}
      </form>
    </div>
  );
};
PaginaDisciplinas.propTypes = {
  monitorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default PaginaDisciplinas;
