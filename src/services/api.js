const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:9000';

// Função auxiliar central que fará todas as chamadas
const apiService = async (endpoint, options = {}) => {
  const { body, ...customConfig } = options;

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const headers = { 'Content-Type': 'application/json' };
  if (token) {
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

// Funções para endpoints de Aluno
export const loginUser = (credentials) => apiService('/usuarios/login', { body: credentials });
export const getPerfilAluno = (id) => apiService(`/aluno/perfil/${id}`);
export const getAulasDoAluno = (id) => apiService(`/aluno/aulas/${id}`);
export const getNotificacoesDoAluno = (id) => apiService(`/aluno/notificacoes/${id}`);
export const postAvaliacao = (avaliacaoData) => apiService('/aluno/avaliacao', { body: avaliacaoData });
export const getAllAlunos = () => apiService('/usuarios/alunos');

// Funções para endpoints de Monitor
export const getPerfilMonitor = (id) => apiService(`/api/monitor/perfil/${id}`);
export const getDisciplinas = () => apiService(`/api/monitor/disciplinas`);
export const getSalas = () => apiService(`/api/monitor/salas`);
export const getAvaliacoesDoMonitor = (id) => apiService(`/api/monitor/avaliacoes/${id}`);
export const getPresencasDoAluno = (alunoId) => apiService(`/api/monitor/presencas/${alunoId}`);
export const postPresenca = (presencaData) => apiService('/api/monitor/presencas/criar', { body: presencaData });
export const criarDisciplina = (data) => apiService('/api/monitor/disciplinas/criar', { body: data });
export const criarSala = (data) => apiService('/api/monitor/salas/criar', { body: data });
export const criarAvaliacao = (data) => apiService('/api/monitor/avaliacoes/criar', { body: data });