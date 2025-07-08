// A URL base da sua API publicada no Render
const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:9000';

// Função auxiliar central que lida com todas as requisições
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
    headers: { ...headers, ...customConfig.headers },
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

// === Funções de Autenticação e Utilizadores ===
export const loginUser = (credentials) => apiService('/usuarios/login', { body: credentials });
export const registerUser = (userData) => apiService('/usuarios/register', { body: userData });
export const getAllAlunos = () => apiService('/usuarios/alunos');

// === Funções para o Perfil do Aluno ===
export const getPerfilAluno = (id) => apiService(`/aluno/perfil/${id}`);
export const getAulasDoAluno = (id) => apiService(`/aluno/aulas/${id}`);
export const getNotificacoesDoAluno = (id) => apiService(`/aluno/notificacoes/${id}`);
export const postAvaliacao = (avaliacaoData) => apiService('/aluno/avaliacao', { body: avaliacaoData });

// === Funções para o Perfil do Monitor ===
export const getPerfilMonitor = (id) => apiService(`/api/monitor/perfil/${id}`);
export const getDisciplinas = () => apiService('/api/monitor/disciplinas');
export const criarDisciplina = (data) => apiService('/api/monitor/disciplinas/criar', { body: data });
export const getSalas = () => apiService('/api/monitor/salas');
export const criarSala = (data) => apiService('/api/monitor/salas/criar', { body: data });
export const getAvaliacoesDoMonitor = (id) => apiService(`/api/monitor/avaliacoes/${id}`);

export const postPresenca = (presencaData) => apiService('/api/monitor/presencas/criar', { body: presencaData });

// --- Funções para o Fluxo de Aulas ---

// Para o monitor criar uma nova aula
export const criarAula = (aulaData) => apiService('/aulas/criar', { body: aulaData });

// Para o aluno ver todas as aulas disponíveis
export const getAllAulas = () => apiService('/aulas');

// Para o aluno se inscrever numa aula
export const inscreverAluno = (inscricaoData) => apiService('/aulas/inscrever', { body: inscricaoData });

// Funções que podem ser necessárias para os formulários
export const getMinhasDisciplinas = (monitorId) => apiService(`/api/monitor/disciplinas/${monitorId}`); // Supondo que esta rota exista
export const getHorariosDisponiveis = () => apiService('/horarios'); // Supondo que esta rota exista
export const getHorariosPorDisciplina = (disciplinaId) => apiService(`/horarios/disciplinas/${disciplinaId}`); // Supondo que esta rota exista