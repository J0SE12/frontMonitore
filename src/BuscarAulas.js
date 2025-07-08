import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
 import { getAllAulas, inscreverAluno } from './services/api';

const cardStyle = { backgroundColor: '#1f2937', borderRadius: '0.75rem', padding: '1.5rem', color: '#d1d5db', marginBottom: '1rem' };
const buttonStyle = { backgroundColor: '#34d399', color: '#111827', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' };

const BuscarAulas = () => {
    const { user } = useAuth();
    const [aulas, setAulas] = useState([]);
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
         const fetchAulas = async () => {
             try {
                 const data = await getAllAulas();
                 setAulas(data);
             } catch (error) {
                 console.error('Erro ao carregar aulas disponíveis:', error);
                 setMensagem('Erro ao carregar aulas disponíveis.');
             }
         };
         fetchAulas();
    }, []);

    const handleInscricao = async (aulaId) => {
        setMensagem('');
        try {
            await inscreverAluno({ aula_id: aulaId, aluno_id: user.id });
            setMensagem('Inscrição realizada com sucesso!');
            // O ideal seria atualizar a lista de aulas ou desabilitar o botão
        } catch (error) {
            setMensagem(error.message || 'Erro ao realizar inscrição.');
        }
    };

    return (
        <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Aulas Disponíveis</h2>
            {mensagem && <p style={{ color: '#f87171', marginBottom: '1rem' }}>{mensagem}</p>}
            {aulas.length > 0 ? (
                aulas.map(aula => (
                    <div key={aula.id_aula} style={cardStyle}>
                        <h3 style={{ fontSize: '1.25rem', color: 'white' }}>{aula.titulo_aula}</h3>
                        <p><strong>Disciplina:</strong> {aula.disciplina_nome}</p>
                        <p><strong>Monitor:</strong> {aula.monitor_nome}</p>
                        <p><strong>Local:</strong> {aula.sala_nome} ({aula.localizacao})</p>
                        <p><strong>Horário:</strong> {aula.dia_da_semana}, das {aula.hora_inicio} às {aula.hora_fim}</p>
                        <p><strong>Vagas:</strong> {aula.vagas_disponiveis}</p>
                        <button onClick={() => handleInscricao(aula.id_aula)} style={{ ...buttonStyle, marginTop: '1rem' }}>
                            Inscrever-se
                        </button>
                    </div>
                ))
            ) : (
                <p>Nenhuma aula disponível no momento.</p>
            )}
        </div>
    );
};

export default BuscarAulas;
