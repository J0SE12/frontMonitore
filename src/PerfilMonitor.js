import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPerfilMonitor } from './services/api';
import Layout from './Layout'; // 👈 Importa o novo Layout

// Importe os componentes de gestão
import PaginaDisciplinas from './DisciplinasMonitor';
import PaginaSalas from './SalasMonitor';
import PaginaAvaliacoes from './AvaliacoesMonitor';
import ControlePresenca from './ControlePresenca';

const cardStyle = {
  backgroundColor: '#1f2937',
  borderRadius: '0.75rem',
  padding: '1.5rem',
  marginBottom: '2rem',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
};

const PerfilMonitor = () => {
    const { id } = useParams();
    const [perfil, setPerfil] = useState(null);
    const [erro, setErro] = useState('');

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const data = await getPerfilMonitor(id);
                setPerfil(data);
            } catch (error) {
                setErro(error.message || 'Erro ao carregar perfil do monitor.');
            }
        };
        if (id) fetchPerfil();
    }, [id]);

    if (erro) return <Layout pageTitle="Erro"><p style={{ color: 'red' }}>{erro}</p></Layout>;
    if (!perfil) return <Layout pageTitle="A carregar..."><p>A carregar perfil...</p></Layout>;

    return (
        <Layout pageTitle={`Dashboard de ${perfil.nome}`}>
            <div style={cardStyle}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', borderBottom: '1px solid #374151', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                    Minhas Informações
                </h2>
                <p><strong>Nome:</strong> {perfil.nome}</p>
                <p><strong>Email:</strong> {perfil.email}</p>
            </div>

            <div style={cardStyle}>
                <ControlePresenca />
            </div>
            
            <div style={cardStyle}>
                <PaginaDisciplinas monitorId={id} />
            </div>
            
            <div style={cardStyle}>
                <PaginaSalas />
            </div>
            
            <div style={cardStyle}>
                <PaginaAvaliacoes monitorId={id} />
            </div>
        </Layout>
    );
};

export default PerfilMonitor;