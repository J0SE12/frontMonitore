import React, { useState } from "react";
// Assumindo que os seus ficheiros de contexto e serviços estão nestes caminhos
import { useAuth } from "./AuthContext"; 
import { loginUser } from "./services/api";

// --- Bloco de Estilos CSS ---
// Todos os estilos estão contidos aqui para simplicidade.
const styles = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#111827', // Fundo escuro principal
    color: '#e5e7eb',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  },
  leftPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '4rem',
    // Gradiente sutil para o painel esquerdo
    backgroundImage: 'linear-gradient(to bottom right, #1f2937, #111827)',
  },
  leftTitle: {
    fontSize: '3.75rem',
    fontWeight: 'bold',
    lineHeight: '1.2',
  },
  leftSubtitle: {
    fontSize: '2.25rem',
    color: '#9ca3af',
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#1f2937', // Fundo do cartão
    borderRadius: '0.75rem',
    padding: '2.5rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  formTitle: {
    textAlign: 'center',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    letterSpacing: '0.1em',
    color: '#34d399', // Verde vibrante
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  label: {
    fontSize: '0.875rem',
    color: '#9ca3af',
    marginBottom: '0.5rem',
    display: 'block',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#374151',
    border: '1px solid #4b5563',
    color: '#e5e7eb',
    borderRadius: '0.5rem',
    padding: '0.75rem 1rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  button: {
    width: '100%',
    backgroundColor: '#34d399',
    color: '#111827',
    fontWeight: 'bold',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.1s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLoading: {
    backgroundColor: '#6ee7b7',
    cursor: 'not-allowed',
  },
  error: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid #ef4444',
    color: '#f87171',
    padding: '1rem',
    borderRadius: '0.5rem',
    textAlign: 'center',
  },
};

// --- Ícone de Spinner ---
const SpinnerIcon = () => <svg style={{ height: '24px', width: '24px' }} className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .animate-spin { animation: spin 1s linear infinite; }`}</style><circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;

// --- Componente Login ---
const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await loginUser({ email, senha });
      login({ token: data.token, id: data.id, papel: data.papel });
    } catch (error) {
      setError(error.message || "Erro de rede. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Estilos para responsividade em ecrãs pequenos */}
      <style>
        {`
          @media (max-width: 768px) {
            .left-panel-responsive {
              display: none;
            }
          }
          .input-focus:focus {
            border-color: #34d399;
            box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.5);
          }
          .button-hover:hover {
            background-color: #6ee7b7;
          }
          .button-active:active {
            transform: scale(0.98);
          }
        `}
      </style>
      <div style={styles.page}>
        <div style={styles.leftPanel} className="left-panel-responsive">
          <h1 style={styles.leftTitle}>Monitore.Me</h1>
          
          {/* Aqui poderia entrar uma ilustração SVG no futuro */}
        </div>
        <div style={styles.rightPanel}>
          <div style={styles.card}>
            <h2 style={styles.formTitle}>LOGIN</h2>
            <form onSubmit={handleLogin} style={styles.form}>
              <div>
                <label htmlFor="email" style={styles.label}>Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  required
                  style={styles.input}
                  className="input-focus"
                />
              </div>
              <div>
                <label htmlFor="password" style={styles.label}>Senha</label>
                <input
                  id="password"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  required
                  style={styles.input}
                  className="input-focus"
                />
              </div>
              
              {error && (
                <div style={styles.error} role="alert">
                  <p>{error}</p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{ ...styles.button, ...(isLoading && styles.buttonLoading) }}
                  className="button-hover button-active"
                >
                  {isLoading ? <SpinnerIcon /> : 'LOGIN'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;