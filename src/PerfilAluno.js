import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPerfilAluno } from "./services/api";
import Layout from './Layout'; // 👈 Importa o novo Layout

// Importe os componentes filhos
import PaginaAulas from "./aulasaluno";
import PaginaNotificacoes from "./notificacoesaluno";

// Estilos para os cartões
const cardStyle = {
  backgroundColor: '#1f2937',
  borderRadius: '0.75rem',
  padding: '1.5rem',
  marginBottom: '2rem',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
};

const PerfilAluno = () => {
  const { id } = useParams();
  const [perfil, setPerfil] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const data = await getPerfilAluno(id);
        setPerfil(data);
      } catch (error) {
        setErro(error.message);
      }
    };
    if (id) fetchPerfil();
  }, [id]);

  if (erro) return <Layout pageTitle="Erro"><p style={{ color: "red" }}>{erro}</p></Layout>;
  if (!perfil) return <Layout pageTitle="A carregar..."><p>A carregar perfil...</p></Layout>;

  return (
    <Layout pageTitle={`Dashboard de ${perfil.nome}`}>
      <div style={cardStyle}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', borderBottom: '1px solid #374151', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
          Minhas Informações
        </h2>
        <p><strong>Nome:</strong> {perfil.nome}</p>
        <p><strong>Email:</strong> {perfil.email}</p>
        <p><strong>Papel:</strong> {perfil.papel}</p>
      </div>

      <div style={cardStyle}>
        <PaginaAulas alunoId={id} />
      </div>
      
      <div style={cardStyle}>
        <PaginaNotificacoes alunoId={id} />
      </div>
    </Layout>
  );
};

export default PerfilAluno;
