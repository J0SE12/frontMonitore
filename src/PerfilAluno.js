import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPerfilAluno } from "./services/api";
import Layout from './Layout'; 

const cardStyle = { backgroundColor: '#1f2937', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '2rem' };

const PerfilAluno = () => {
  const { id } = useParams();
  const [perfil, setPerfil] = useState(null);
  const [erro, setErro] = useState("");

  // Links de navegação específicos para o Aluno
  const alunoNavLinks = [
    { path: `/aluno/aulas/${id}`, label: 'Minhas Aulas' },
    { path: `/aluno/notificacoes/${id}`, label: 'Notificações' },
    { path: `/aluno/avaliar`, label: 'Avaliar Monitor' }
  ];

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
    // Passa os links de navegação para o componente Layout
    <Layout pageTitle={`Bem-vindo, ${perfil.nome}`} navLinks={alunoNavLinks}>
      <div style={cardStyle}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
          Informações do Perfil
        </h2>
        <p><strong>Email:</strong> {perfil.email}</p>
        <p><strong>Papel:</strong> {perfil.papel}</p>
      </div>
      {/* O conteúdo das outras páginas (aulas, notificações) será renderizado pelas suas próprias rotas */}
    </Layout>
  );
};

export default PerfilAluno;