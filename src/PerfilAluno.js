import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PerfilAluno = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      console.log("Usuário não autenticado. Redirecionando para login...");
      navigate("/login", { replace: true });
      return;
    }

    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token não encontrado. Faça login novamente.");
          navigate("/login", { replace: true });
          return;
        }

        const response = await fetch(`http://localhost:9000/aluno/perfil/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Dados do aluno carregados:", data);
          setUserData(data);
        } else {
          setError(data.message || "Erro ao carregar os dados do perfil.");
        }
      } catch (error) {
        setError("Erro de rede. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerfil();
  }, [id, navigate, user]);

  if (isLoading) {
    return <p>Carregando dados do perfil...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>Perfil do Aluno</h2>
      <p><strong>ID:</strong> {userData.id}</p>
      <p><strong>Nome:</strong> {userData.nome}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Papel:</strong> {userData.papel}</p>
      <p><strong>Data de Criação:</strong> {new Date(userData.criado_em).toLocaleString()}</p>
      <p><strong>Última Atualização:</strong> {new Date(userData.atualizado_em).toLocaleString()}</p>
    </div>
  );
};

export default PerfilAluno;
