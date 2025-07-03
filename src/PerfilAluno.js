import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPerfilAluno } from "./services/api"; // 👈 Use o serviço

// 👇 IMPORTE OS COMPONENTES QUE VOCÊ JÁ TEM
import PaginaAulas from "./aulasaluno";
import PaginaNotificacoes from "./avaliacaoaluno";

const PerfilAluno = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    // A verificação de usuário logado agora é feita pelo ProtectedRoute.
    // Este componente só busca os dados do perfil.
    const fetchPerfil = async () => {
      try {
        const data = await getPerfilAluno(id);
        setPerfil(data);
      } catch (error) {
        setErro(error.message);
      }
    };
    fetchPerfil();
  }, [id]);

  // Função para navegar para a página de avaliação
  // Supondo que você queira avaliar um monitor específico. 
  // O ID do monitor precisaria vir de algum lugar (ex: de uma lista de monitores).
  // Por simplicidade, vamos usar um ID fixo como exemplo.
  const handleAvaliacaoClick = (monitorId) => {
    navigate(`/avaliacao/${monitorId}`);
  };

  if (erro) return <p style={{ color: "red" }}>{erro}</p>;
  if (!perfil) return <p>Carregando perfil...</p>;

  return (
    <div>
      <h2>Perfil do Aluno</h2>
      <p><strong>Nome:</strong> {perfil.nome}</p>
      <p><strong>Email:</strong> {perfil.email}</p>
      
      {/* Exemplo de botão para avaliar um monitor específico */}
      <button onClick={() => handleAvaliacaoClick(1)}>Avaliar Monitor ID 1</button>
      
      <hr />
      
      {/* 👇 RENDERIZE OS OUTROS COMPONENTES AQUI, passando o ID do aluno */}
      <PaginaNotificacoes alunoId={id} />
      
      <hr />

      <PaginaAulas alunoId={id} />
    </div>
  );
};

export default PerfilAluno;
