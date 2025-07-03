const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:9000';

// Função auxiliar central que fará todas as chamadas
const apiService = async (endpoint, options = {}) => {
  const { body, ...customConfig } = options;

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    // IMPORTANTE: O padrão é 'Bearer token', seu backend pode precisar de ajuste
    // ou você pode remover 'Bearer ' se seu backend espera só o token.
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Ocorreu um erro na API');
    }
    return data;
  } catch (error) {
    console.error('Erro no serviço da API:', error);
    throw error;
  }
};

// Exporte uma função para cada endpoint da sua API
export const loginUser = (credentials) => apiService('/usuarios/login', { body: credentials });
export const getPerfilAluno = (id) => apiService(`/aluno/perfil/${id}`);
export const getAulasDoAluno = (id) => apiService(`/aluno/aulas/${id}`); // Supondo que esta rota exista
export const getNotificacoesDoAluno = (id) => apiService(`/aluno/notificacoes/${id}`); // Supondo que esta rota exista
export const postAvaliacao = (avaliacaoData) => apiService('/aluno/avaliacao', { body: avaliacaoData });