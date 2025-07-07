import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPerfilMonitor } from './services/api';
import Layout from './Layout';

const cardStyle = { backgroundColor: '#1f2937', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '2rem' };

const PerfilMonitor = () => {
    const { id } = useParams();
    const [perfil, setPerfil] = useState(null);
    const [erro, setErro] = useState('');

    // Links de navegação específicos para o Monitor
    const monitorNavLinks = [
      { path: `/monitor/disciplinas`, label: 'Gerir Disciplinas' },
      { path: `/monitor/salas`, label: 'Gerir Salas' },
      { path: `/monitor/presenca`, label: 'Controle de Presença' },
      { path: `/monitor/avaliacoes/${id}`, label: 'Ver Avaliações' }
    ];

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
        <Layout pageTitle={`Dashboard de ${perfil.nome}`} navLinks={monitorNavLinks}>
            <div style={cardStyle}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                    Minhas Informações
                </h2>
                <p><strong>Email:</strong> {perfil.email}</p>
            </div>
             {/* O conteúdo das outras páginas (disciplinas, salas) será renderizado pelas suas próprias rotas */}
        </Layout>
    );
};

export default PerfilMonitor;