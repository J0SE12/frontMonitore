import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpa erros anteriores
  
    try {
      const response = await fetch("http://localhost:9000/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        login({ token: data.token, userId: data.id }); // Atualiza o contexto
      } else {
        setError(data.message || "Erro ao fazer login.");
      }
    } catch (error) {
      setError("Erro de rede. Tente novamente mais tarde.");
    }
  };
  
  // Redireciona o usuário para o perfil após o login bem-sucedido
  useEffect(() => {
    if (user?.userId) {
      console.log("Redirecionando para:", `/aluno/perfil/${user.userId}`);

      // Alternativa 1: Redirecionamento React Router
    //  navigate(`/aluno/perfil/${user.userId}`, { replace: true });

      // Alternativa 2: Recarrega a página inteira (caso o React Router falhe)
       window.location.href = `http://localhost:3000/aluno/perfil/${user.userId}`;
    }
  }, [user, navigate]);

  return (
    <div>
      <h2>Bem-vindo ao Sistema de Aulas</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
