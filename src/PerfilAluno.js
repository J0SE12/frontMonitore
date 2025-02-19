import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PerfilAluno = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [notificacoes, setNotificacoes] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redireciona se o usuário não estiver autenticado
      return;
    }

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
        console.error("Erro ao carregar notificações:", error);
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
        console.error("Erro ao carregar aulas:", error);
      }
    };

    fetchPerfil();
    fetchNotificacoes();
    fetchAulas();
  }, [id, user, navigate]);

  // Função para avaliar um monitor
  const avaliarMonitor = async () => {
    const monitorId = prompt("Digite o ID do monitor que deseja avaliar:");
    const feedback = prompt("Digite sua avaliação para o monitor:");

    if (!monitorId || !feedback) {
      alert("Preencha todos os campos para enviar a avaliação.");
      return;
    }

    try {
      const response = await fetch("http://localhost:9000/aluno/avaliacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ monitorId, feedback }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem("Avaliação enviada com sucesso!");
      } else {
        setMensagem(data.message || "Erro ao enviar avaliação.");
      }
    } catch (error) {
      setMensagem("Erro ao enviar avaliação.");
    }
  };

  if (erro) return <p style={{ color: 
"red" }}>{erro}</p>;

  return (
    <div>
      <h1>Perfil do Aluno</h1>
      <h2>{perfil?.nome}</h2>
      <p>ID: {perfil?.id}</p>
      <p>Email: {perfil?.email}</p>
      <h2>Notificações</h2>
      <ul>
        {notificacoes.map((notificacao, index) => (
          <li key={index}>{notificacao.mensagem}</li>
        ))}
      </ul>
      <h2>Minhas Aulas</h2>
      <ul>
        {aulas.map((aula, index) => (
          <li key={index}>
            {`${aula.sala_nome} - ${aula.disciplina} (${aula.dia_da_semana}, ${aula.hora_inicio} - ${aula.hora_fim})`}
          </li>
        ))}
      </ul>
      <button onClick={avaliarMonitor}>Avaliar Monitor</button>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default PerfilAluno;