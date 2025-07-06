import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPerfilMonitor } from './services/api';
import { useAuth } from './AuthContext'; // 👈 1. Importe o useAuth

// Importe os componentes de gestão
import PaginaDisciplinas from './DisciplinasMonitor';
import PaginaSalas from './SalasMonitor';
import PaginaAvaliacoes from './AvaliacoesMonitor';
import ControlePresenca from './ControlePresenca';

const PerfilMonitor = () => {
    const { id } = useParams();
    const { logout } = useAuth(); // 👈 2. Obtenha a função de logout
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

    const handleLogout = () => {
        logout(); // Chama a função de logout do contexto
    };

    if (erro) return <p style={{ color: 'red' }}>{erro}</p>;
    if (!perfil) return <p>A carregar perfil...</p>;

    return (
        <div>
            {/* 👇 3. Adicione o botão de logout */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Dashboard do Monitor</h2>
                <button 
                    onClick={handleLogout} 
                    style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                    Sair
                </button>
            </div>

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