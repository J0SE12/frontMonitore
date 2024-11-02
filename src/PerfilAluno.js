import React from 'react';
import { useAuth } from './AuthContext'; // Importa o hook de autenticação para acessar o contexto

const PerfilAluno = () => {
  const { user, logout } = useAuth(); // Obtém as informações do usuário e a função de logout do contexto

  // Exibe uma mensagem de carregamento se o usuário ainda não foi carregado
  if (!user) {
    return <p>Carregando dados do perfil...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Perfil do Aluno</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Nome:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={logout} style={styles.button}>Sair</button>
    </div>
  );
};

// Estilos básicos para o componente (opcional)
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center'
  },
  button: {
    padding: '10px 20px',
    marginTop: '20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default PerfilAluno;
