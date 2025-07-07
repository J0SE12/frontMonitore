import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPerfilAluno } from "./services/api";
import Layout from './Layout'; 

const cardStyle = { backgroundColor: '#1f2937', borderRadius: '0.75rem', padding: '1.5rem', color: '#d1d5db' };
const cardTitleStyle = { fontSize: '1.5rem', fontWeight: 'bold', color: 'white', borderBottom: '1px solid #374151', paddingBottom: '0.5rem', marginBottom: '1rem' };

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

  if (erro) return <Layout><p style={{ color: "red" }}>{erro}</p></Layout>;
  if (!perfil) return <Layout><p>A carregar perfil...</p></Layout>;

  return (
    <Layout>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '2rem' }}>
        Bem-vindo, {perfil.nome}!
      </h1>
      <div style={cardStyle}>
        <h2 style={cardTitleStyle}>
          Minhas Informações
        </h2>
        <p><strong>Email:</strong> {perfil.email}</p>
        <p><strong>Papel:</strong> {perfil.papel}</p>
      </div>
    </Layout>
  );
};

export default PerfilAluno;
