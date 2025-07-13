import React, { useEffect, useState } from "react";
import { getSalas, criarSala } from './services/api';

const cardStyle = { backgroundColor: '#1f2937', borderRadius: '0.75rem', padding: '1.5rem', color: '#d1d5db', marginBottom: '2rem' };
const cardTitleStyle = { fontSize: '1.25rem', fontWeight: 'bold', color: 'white', borderBottom: '1px solid #374151', paddingBottom: '0.5rem', marginBottom: '1rem' };
const inputStyle = { width: '100%', boxSizing: 'border-box', backgroundColor: '#374151', border: '1px solid #4b5563', color: '#e5e7eb', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginTop: '0.5rem' };
const labelStyle = { fontWeight: '500', color: '#9ca3af' };
const buttonStyle = { width: '100%', backgroundColor: '#34d399', color: '#111827', fontWeight: 'bold', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', marginTop: '1rem' };

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
      } catch(error) {
          setMensagem({ type: 'error', text: error.message || "Erro ao carregar salas."});
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
      setMensagem({ type: 'success', text: "Sala criada com sucesso!"});
      fetchSalas(); // 👇 Atualiza a lista após a criação
      setNome("");
      setCapacidade("");
      setLocalizacao("");
    } catch (error) {
      setMensagem({ type: 'error', text: error.message || "Erro ao criar sala."});
    }
  };

  return (
    <div>
      <div style={cardStyle}>
        <h2 style={cardTitleStyle}>Salas de Aula Cadastradas</h2>
        <ul>
            {salas.length > 0 
                ? salas.map((sala) => <li key={sala.id_sala} style={{padding: '0.5rem 0'}}>{sala.nome} - Capacidade: {sala.capacidade}</li>)
                : <li>Nenhuma sala cadastrada.</li>
            }
        </ul>
      </div>

      <div style={cardStyle}>
        <h2 style={cardTitleStyle}>Criar Nova Sala</h2>
        <form onSubmit={handleCriarSala} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="nome-sala" style={labelStyle}>Nome da Sala</label>
            <input id="nome-sala" type="text" value={nome} onChange={(e) => setNome(e.target.value)} style={inputStyle} required />
          </div>
          <div>
            <label htmlFor="capacidade-sala" style={labelStyle}>Capacidade</label>
            <input id="capacidade-sala" type="number" value={capacidade} onChange={(e) => setCapacidade(e.target.value)} style={inputStyle} required />
          </div>
          <div>
            <label htmlFor="local-sala" style={labelStyle}>Localização</label>
            <input id="local-sala" type="text" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} style={inputStyle} required />
          </div>
          <button type="submit" style={buttonStyle}>Criar Sala</button>
          {mensagem && <p style={{ marginTop: '1rem', color: mensagem.type === 'error' ? '#f87171' : '#34d399' }}>{mensagem.text}</p>}
        </form>
      </div>
    </div>
  );
};

export default PaginaSalas;
