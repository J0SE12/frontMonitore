import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getMinhasDisciplinas, getHorariosDisponiveis, criarAula } from './services/api';

const cardStyle = { backgroundColor: '#1f2937', borderRadius: '0.75rem', padding: '1.5rem', color: '#d1d5db' };
const inputStyle = { width: '100%', boxSizing: 'border-box', backgroundColor: '#374151', border: '1px solid #4b5563', color: '#e5e7eb', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginTop: '0.5rem' };
const labelStyle = { fontWeight: '500', color: '#9ca3af' };
const buttonStyle = { width: '100%', backgroundColor: '#34d399', color: '#111827', fontWeight: 'bold', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', marginTop: '1rem' };

const GerenciarAulas = () => {
    const { user } = useAuth();
    const [disciplinas, setDisciplinas] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [mensagem, setMensagem] = useState('');

    const [disciplinaId, setDisciplinaId] = useState('');
    const [horarioId, setHorarioId] = useState('');
    const [tituloAula, setTituloAula] = useState('');
    const [vagas, setVagas] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [disciplinasData, horariosData] = await Promise.all([
                    getMinhasDisciplinas(user.id),
                    getHorariosDisponiveis()
                ]);
                setDisciplinas(disciplinasData);
                setHorarios(horariosData);
            } catch (error) {
                setMensagem('Erro ao carregar dados para o formulário.');
            }
        };
        fetchData();
    }, [user.id]);

    const handleCriarAula = async (e) => {
        e.preventDefault();
        setMensagem('');
        try {
            await criarAula({
                disciplina_id: disciplinaId,
                monitor_id: user.id,
                horario_id: horarioId,
                titulo_aula: tituloAula,
                vagas_disponiveis: vagas
            });
            setMensagem('Aula criada com sucesso!');
        } catch (error) {
            setMensagem(error.message || 'Erro ao criar aula.');
        }
    };

    return (
        <div style={cardStyle}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem' }}>Criar Nova Aula de Monitoria</h2>
            <form onSubmit={handleCriarAula} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label htmlFor="titulo-aula" style={labelStyle}>Título da Aula</label>
                    <input id="titulo-aula" type="text" value={tituloAula} onChange={e => setTituloAula(e.target.value)} style={inputStyle} placeholder="Ex: Revisão para Prova 1" required />
                </div>
                <div>
                    <label htmlFor="disciplina-select" style={labelStyle}>Disciplina</label>
                    <select id="disciplina-select" value={disciplinaId} onChange={e => setDisciplinaId(e.target.value)} style={inputStyle} required>
                        <option value="">Selecione uma disciplina</option>
                        {disciplinas.map(d => <option key={d.id_dsc} value={d.id_dsc}>{d.nome}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="horario-select" style={labelStyle}>Horário e Sala</label>
                    <select id="horario-select" value={horarioId} onChange={e => setHorarioId(e.target.value)} style={inputStyle} required>
                        <option value="">Selecione um horário</option>
                        {horarios.map(h => <option key={h.id_hor} value={h.id_hor}>{`${h.dia_da_semana} das ${h.hora_inicio} às ${h.hora_fim} na sala ${h.sala_nome}`}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="vagas-input" style={labelStyle}>Vagas Disponíveis</label>
                    <input id="vagas-input" type="number" value={vagas} onChange={e => setVagas(e.target.value)} style={inputStyle} min="1" required />
                </div>
                <button type="submit" style={buttonStyle}>Criar Aula</button>
                {mensagem && <p style={{ marginTop: '1rem', color: '#34d399' }}>{mensagem}</p>}
            </form>
        </div>
    );
};

export default GerenciarAulas;