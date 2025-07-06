import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPerfilMonitor } from './services/api';

// Importe os componentes de gestão
import PaginaDisciplinas from './DisciplinasMonitor';
import PaginaSalas from './SalasMonitor';
import PaginaAvaliacoes from './AvaliacoesMonitor';
import ControlePresenca from './ControlePresenca';

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

    if (erro) return <p style={{ color: 'red' }}>{erro}</p>;
    if (!perfil) return <p>A carregar perfil...</p>;

    return (
        <div>
            <h2>Dashboard do Monitor</h2>
            <p><strong>Nome:</strong> {perfil.nome}</p>
            <p><strong>Email:</strong> {perfil.email}</p>

            <hr style={{ margin: '20px 0' }} />
            <ControlePresenca />

            <hr style={{ margin: '20px 0' }} />
            <PaginaDisciplinas monitorId={id} />

            <hr style={{ margin: '20px 0' }} />
            <PaginaSalas />
            
            <hr style={{ margin: '20px 0' }} />
            <PaginaAvaliacoes monitorId={id} />
        </div>
    );
};

export default PerfilMonitor;