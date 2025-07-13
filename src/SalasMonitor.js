

import React, { useEffect, useState } from "react";
import { getSalas, criarSala } from './services/api';

const cardStyle = { backgroundColor: '#1f2937', borderRadius: '0.75rem', padding: '1.5rem', color: '#d1d5db', marginBottom: '2rem' };
const cardTitleStyle = { fontSize: '1.25rem', fontWeight: 'bold', color: 'white', borderBottom: '1px solid #374151', paddingBottom: '0.5rem', marginBottom: '1rem' };
const inputStyle = { width: '100%', boxSizing: 'border-box', backgroundColor: '#374151', border: '1px solid #4b5563', color: '#e5e7eb', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginTop: '0.5rem' };
const labelStyle = { fontWeight: '500', color: '#9ca3af' };
const buttonStyle = { width: '100%', backgroundColor: '#34d399', color: '#111827', fontWeight: 'bold', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', marginTop: '1.5rem' };

const PaginaSalas = () => {
  const [salas, setSalas] = useState([]);
  const [nome, setNome] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  // INÍCIO: NOVOS ESTADOS PARA HORÁRIO
  const [diaSemana, setDiaSemana] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  // FIM: NOVOS ESTADOS PARA HORÁRIO
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
      // INÍCIO: ENVIANDO OS DADOS DE HORÁRIO PARA A API
      await criarSala({ 
        nome, 
        capacidade, 
        localizacao, 
        dia_da_semana: diaSemana, 
        hora_inicio: horaInicio, 
        hora_fim: horaFim 
      });
      // FIM: ENVIANDO OS DADOS DE HORÁRIO PARA A API
      setMensagem({ type: 'success', text: "Sala e horário criados com sucesso!"});
      fetchSalas();
      setNome("");
      setCapacidade("");
      setLocalizacao("");
      // INÍCIO: LIMPANDO OS NOVOS CAMPOS
      setDiaSemana("");
      setHoraInicio("");
      setHoraFim("");
      // FIM: LIMPANDO OS NOVOS CAMPOS
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

          {/* INÍCIO: NOVOS CAMPOS DE HORÁRIO */}
          <h3 style={{...labelStyle, fontSize: '1rem', marginTop: '1rem', borderTop: '1px solid #374151', paddingTop: '1rem'}}>Horário Disponível</h3>
          
          <div>
            <label htmlFor="dia-semana" style={labelStyle}>Dia da Semana</label>
            <select id="dia-semana" value={diaSemana} onChange={(e) => setDiaSemana(e.target.value)} style={inputStyle} required>
              <option value="">Selecione o dia</option>
              <option value="Segunda-feira">Segunda-feira</option>
              <option value="Terça-feira">Terça-feira</option>
              <option value="Quarta-feira">Quarta-feira</option>
              <option value="Quinta-feira">Quinta-feira</option>
              <option value="Sexta-feira">Sexta-feira</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="hora-inicio" style={labelStyle}>Hora Início</label>
              <input id="hora-inicio" type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} style={inputStyle} required />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="hora-fim" style={labelStyle}>Hora Fim</label>
              <input id="hora-fim" type="time" value={horaFim} onChange={(e) => setHoraFim(e.target.value)} style={inputStyle} required />
            </div>
          </div>
          {/* FIM: NOVOS CAMPOS DE HORÁRIO */}

          <button type="submit" style={buttonStyle}>Criar Sala</button>
          {mensagem && <p style={{ marginTop: '1rem', color: mensagem.type === 'error' ? '#f87171' : '#34d399' }}>{mensagem.text}</p>}
        </form>
      </div>
    </div>
  );
};
export default PaginaSalas;