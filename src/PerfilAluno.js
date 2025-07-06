import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPerfilAluno } from "./services/api";
import { useAuth } from "./AuthContext"; // 👈 1. Importe o useAuth

// 👇 IMPORTE OS COMPONENTES QUE VOCÊ JÁ TEM
// (Corrigi os nomes dos ficheiros para serem mais consistentes)
import PaginaAulas from "./aulasaluno";
import PaginaNotificacoes from "./notificacoesaluno";


const PerfilAluno = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth(); // 👈 2. Obtenha a função de logout do contexto
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
    if (id) {
        fetchPerfil();
    }
  }, [id]);

  const handleAvaliacaoClick = (monitorId) => {
    navigate(`/avaliacao/${monitorId}`);
  };

  const handleLogout = () => {
    logout(); // Chama a função de logout do contexto
  };

  if (erro) return <p style={{ color: "red" }}>{erro}</p>;
  if (!perfil) return <p>Carregando perfil...</p>;

  return (
    <div>
      {/* 👇 3. Adicione o botão de logout */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Dashboard do Aluno</h2>
        <button 
            onClick={handleLogout} 
            style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
            Sair
        </button>
      </div>
      
      <p><strong>Nome:</strong> {perfil.nome}</p>
      <p><strong>Email:</strong> {perfil.email}</p>
      
      {/* Exemplo de botão para avaliar um monitor específico */}
      <button onClick={() => handleAvaliacaoClick(1)}>Avaliar Monitor ID 1</button>
      
      <hr style={{ margin: '20px 0' }} />
      
      {/* RENDERIZE OS OUTROS COMPONENTES AQUI, passando o ID do aluno */}
      <PaginaNotificacoes alunoId={id} />
      
      <hr style={{ margin: '20px 0' }} />

      <PaginaAulas alunoId={id} />
    </div>
  );
};

export default PerfilAluno;