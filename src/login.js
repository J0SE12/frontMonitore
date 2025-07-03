import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { loginUser } from "./services/api"; // Importa a função do serviço de API

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); // Pega apenas a função de login do contexto

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Chama a função centralizada do serviço de API
      const data = await loginUser({ email, senha });
      
      // Passa todos os dados do usuário para a função de login do contexto.
      // A função de login agora cuidará do redirecionamento.
      login({ token: data.token, id: data.id, papel: data.papel });

    } catch (error) {
      // O serviço de API já lança um erro com a mensagem correta
      setError(error.message || "Erro de rede. Tente novamente mais tarde.");
    }
  };

 

  return (
    <div>
      <h2>Bem-vindo ao Sistema de Aulas</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:<input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Senha:<input
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