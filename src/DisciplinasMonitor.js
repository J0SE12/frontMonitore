import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getDisciplinas, criarDisciplina } from './services/api';


const cardStyle = { backgroundColor: '#1f2937', borderRadius: '0.75rem', padding: '1.5rem', color: '#d1d5db', marginBottom: '2rem' };
const cardTitleStyle = { fontSize: '1.25rem', fontWeight: 'bold', color: 'white', borderBottom: '1px solid #374151', paddingBottom: '0.5rem', marginBottom: '1rem' };
const inputStyle = { width: '100%', boxSizing: 'border-box', backgroundColor: '#374151', border: '1px solid #4b5563', color: '#e5e7eb', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginTop: '0.5rem' };
const labelStyle = { fontWeight: '500', color: '#9ca3af' };
const buttonStyle = { width: '100%', backgroundColor: '#34d399', color: '#111827', fontWeight: 'bold', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', marginTop: '1rem' };


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
      <div style={cardStyle}>
        <h2 style={cardTitleStyle}>Disciplinas Atuais</h2>
        <ul>
          {disciplinas.length > 0 
            ? disciplinas.map((d) => <li key={d.id_dsc} style={{padding: '0.5rem 0'}}>{d.nome}</li>)
            : <li>Nenhuma disciplina cadastrada.</li>
          }
        </ul>
      </div>

      <div style={cardStyle}>
        <h2 style={cardTitleStyle}>Criar Nova Disciplina</h2>
        <form onSubmit={() => {}} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="nome-disciplina" style={labelStyle}>Nome da Disciplina</label>
            <input id="nome-disciplina" type="text" value={nome} onChange={(e) => setNome(e.target.value)} style={inputStyle} required />
          </div>
          <div>
            <label htmlFor="desc-disciplina" style={labelStyle}>Descrição</label>
            <input id="desc-disciplina" type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} style={inputStyle} required />
          </div>
          <button type="submit" style={buttonStyle}>Criar Disciplina</button>
          {mensagem && <p style={{ marginTop: '1rem' }}>{mensagem}</p>}
        </form>
      </div>
    </div>
  );
};

export default PaginaDisciplinas;