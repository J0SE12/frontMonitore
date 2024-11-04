// PerfilAluno.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PerfilAluno = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams(); // Obtém o ID do aluno da URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('Token não encontrado, redirecionando para login.');
        navigate('/login'); // Redireciona para a página de login se o token estiver ausente
        return;
      }

      try {
        const response = await fetch(`http://localhost:9000/aluno/perfil/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Inclui o token no cabeçalho
          },
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setUser(data);
        } else {
          console.error('Erro ao buscar o perfil:', data.message);
        }
      } catch (error) {
        console.error('Erro de rede:', error);
      }
    };

    fetchPerfil();
  }, [id, navigate]);

  if (!user) {
    return <p>Carregando dados do perfil...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Perfil do Aluno</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Nome:</strong> {user.nome}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center'
  }
};

export default PerfilAluno;
