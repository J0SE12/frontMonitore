import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PerfilAluno = () => {
  const { user } = useAuth(); // Obtém usuário autenticado
  const { id } = useParams(); // Obtém o ID da URL
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState(null);
  const [notificacoes, setNotificacoes] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [avaliacao, setAvaliacao] = useState(null);
  const [erro, setErro] = useState(""); // Agora `erro` será exibido na interface.

  useEffect(() => {
    if (!user) return; // Garante que o user existe antes de buscar os dados

    const fetchPerfil = async () => {
      try {
        const response = await fetch(`http://localhost:9000/aluno/perfil/${id}`);
        const data = await response.json();
        if (response.ok) {
          setPerfil(data);
        } else {
          setErro(data.message || "Erro ao carregar perfil.");
        }
      } catch (error) {
        setErro("Erro ao carregar perfil.");
      }
    };

    const fetchNotificacoes = async () => {
      try {
        const response = await fetch(`http://localhost:9000/aluno/notificacoes/${id}`);
        const data = await response.json();
        if (response.ok) {
          setNotificacoes(data);
        }
      } catch (error) {
        setErro("Erro ao carregar notificações.");
      }
    };

    const fetchAulas = async () => {
      try {
        const response = await fetch(`http://localhost:9000/aluno/aulas/${id}`);
        const data = await response.json();
        if (response.ok) {
          setAulas(data);
        }
      } catch (error) {
        setErro("Erro ao carregar aulas.");
      }
    };

    const fetchAvaliacao = async () => {
      try {
        const response = await fetch(`http://localhost:9000/aluno/avaliacao/${id}`);
        const data = await response.json();
        if (response.ok) {
          setAvaliacao(data);
        }
      } catch (error) {
        setErro("Erro ao carregar avaliações.");
      }
    };

    fetchPerfil();
    fetchNotificacoes();
    fetchAulas();
    fetchAvaliacao();
  }, [id, user]);

  // Se não há usuário autenticado, impede redirecionamento automático
  if (!user) {
    return <p>Carregando...</p>;
  }

  // ✅ Função para redirecionar para avaliação
  const handleAvaliacaoClick = () => {
    navigate(`/aluno/avaliacao/${id}`, { replace: true });
  };

  return (
    <div>
      <h2>Perfil do Aluno</h2>
      {perfil ? (
        <>
          <p><strong>Nome:</strong> {perfil.nome}</p>
          <p><strong>ID:</strong> {perfil.id}</p>
          <p><strong>Email:</strong> {perfil.email}</p>
        </>
      ) : (
        <p>Carregando perfil...</p>
      )}

      {erro && <p style={{ color: "red" }}>{erro}</p>} {/* Exibição de erro */}

      <h3>Notificações</h3>
      <ul>
        {notificacoes.length > 0 ? (
          notificacoes.map((notif) => <li key={notif.id}>{notif.mensagem}</li>)
        ) : (
          <p>Nenhuma notificação encontrada.</p>
        )}
      </ul>

      <h3>Minhas Aulas</h3>
      <ul>
        {aulas.length > 0 ? (
          aulas.map((aula) => (
            <li key={aula.id_sala}>
              {aula.disciplina} - {aula.dia_da_semana} às {aula.hora_inicio} ({aula.localizacao})
            </li>
          ))
        ) : (
          <p>Nenhuma aula encontrada.</p>
        )}
      </ul>

      <h3>Minhas Avaliações</h3>
      <ul>
        {avaliacao ? (
          <li>{avaliacao.feedback}</li>
        ) : (
          <p>Nenhuma avaliação encontrada.</p>
        )}
      </ul>

      {/* ✅ Botão corrigido para avaliação */}
      <button onClick={handleAvaliacaoClick}>Avaliar Monitor</button>
    </div>
  );
};

export default PerfilAluno;
