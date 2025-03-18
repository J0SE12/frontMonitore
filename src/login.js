import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false); // 🔥 Adicionamos um controle para evitar loops
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:9000/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        login({ token: data.token, userId: data.id });

        // 🔥 Definimos o estado de redirecionamento para evitar re-execuções
        setIsRedirecting(true);
        navigate(`/aluno/perfil/${data.id}`, { replace: true });
      } else {
        setError(data.message || "Erro ao fazer login.");
      }
    } catch (error) {
      setError("Erro de rede. Tente novamente mais tarde.");
    }
  };

  // 🔥 Evitamos que o redirecionamento ocorra várias vezes
  useEffect(() => {
    if (user?.userId && !isRedirecting) {
      console.log("Usuário logado, redirecionando...");
      setIsRedirecting(true); // 🔥 Evita loops infinitos
      navigate(`/aluno/perfil/${user.userId}`, { replace: true });
    }
  }, [user, isRedirecting, navigate]); // 🔥 Agora depende do estado de redirecionamento

  return (
    <div>
      <h2>Bem-vindo ao Sistema de Aulas</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Senha:
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </label>
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
