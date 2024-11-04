// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:9000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token); // Salva o token
        navigate(`/perfil-aluno/${data.userId}`); // Redireciona para o perfil do aluno usando o ID do usuário
      } else {
        console.error('Erro ao fazer login:', data.message);
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };

  return (
    <div>
      <h2>Bem-vindo ao Sistema de Aulas</h2>
      <form onSubmit={handleLogin}>
        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>Senha:
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </label>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
