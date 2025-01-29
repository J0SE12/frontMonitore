import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PerfilAluno = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams(); // ID do aluno passado pela URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token não encontrado. Redirecionando para login.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`http://localhost:9000/perfil/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data); // Atualiza o estado com os dados do aluno
        } else {
          setError(data.message || "Erro ao buscar o perfil.");
        }
      } catch (error) {
        setError("Erro de rede. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false); // Finaliza o carregamento
      }
    };

    fetchPerfil();
  }, [id, navigate]);

  if (isLoading) {
    return <p>Carregando dados do perfil...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!user) {
    return <p>Nenhum dado de perfil disponível.</p>;
  }

  return (
    <div>
      <h2>Perfil do Aluno</h2>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Nome:</strong> {user.nome}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
};

export default PerfilAluno;
