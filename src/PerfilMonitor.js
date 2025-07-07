import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPerfilMonitor } from './services/api';
import Layout from './Layout';

const cardStyle = { backgroundColor: '#1f2937', borderRadius: '0.75rem', padding: '1.5rem', color: '#d1d5db' };
const cardTitleStyle = { fontSize: '1.5rem', fontWeight: 'bold', color: 'white', borderBottom: '1px solid #374151', paddingBottom: '0.5rem', marginBottom: '1rem' };

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

    if (erro) return <Layout><p style={{ color: 'red' }}>{erro}</p></Layout>;
    if (!perfil) return <Layout><p>A carregar perfil...</p></Layout>;

    return (
        <Layout>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '2rem' }}>
                Dashboard do Monitor
            </h1>
            <div style={cardStyle}>
                <h2 style={cardTitleStyle}>
                    Minhas Informações
                </h2>
                <p><strong>Nome:</strong> {perfil.nome}</p>
                <p><strong>Email:</strong> {perfil.email}</p>
            </div>
        </Layout>
    );
};

export default PerfilMonitor;