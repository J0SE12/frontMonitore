import React, { useEffect, useState } from "react";
import { getDisciplinas, getAllAlunos, postPresenca } from './services/api'; 

const cardStyle = { backgroundColor: '#1f2937', borderRadius: '0.75rem', padding: '1.5rem', color: '#d1d5db' };
const inputStyle = { width: '100%', boxSizing: 'border-box', backgroundColor: '#374151', border: '1px solid #4b5563', color: '#e5e7eb', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginTop: '0.5rem' };
const labelStyle = { fontWeight: '500', color: '#9ca3af' };
const buttonStyle = { width: '100%', backgroundColor: '#34d399', color: '#111827', fontWeight: 'bold', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', marginTop: '1rem' };

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
    <div style={cardStyle}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem' }}>Controle de Presença</h2>
        <form onSubmit={registrarPresenca} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
                <label htmlFor="aula-select" style={labelStyle}>Selecione a Aula (Disciplina):</label>
                <select id="aula-select" value={aulaId} onChange={(e) => setAulaId(e.target.value)} style={inputStyle} required>
                    <option value="">Escolha uma aula</option>
                    {aulas.map((aula) => (
                        <option key={aula.id_dsc} value={aula.id_dsc}>{aula.nome}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="aluno-select" style={labelStyle}>Selecione o Aluno:</label>
                <select id="aluno-select" value={alunoId} onChange={(e) => setAlunoId(e.target.value)} style={inputStyle} required>
                    <option value="">Escolha um aluno</option>
                    {alunos.map((aluno) => (
                        <option key={aluno.id} value={aluno.id}>{aluno.nome}</option>
                    ))}
                </select>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <input id="presenca-check" type="checkbox" checked={presente} onChange={(e) => setPresente(e.target.checked)} style={{width: '1rem', height: '1rem'}} />
                <label htmlFor="presenca-check" style={labelStyle}>Presente</label>
            </div>
            <button type="submit" style={buttonStyle}>Registar Presença</button>
            {mensagem && <p style={{marginTop: '1rem'}}>{mensagem}</p>}
        </form>
    </div>
  );
};

export default ControlePresenca;