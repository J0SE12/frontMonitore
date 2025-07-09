import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { postAvaliacao } from './services/api'; // 👈 Use o serviço

const cardStyle = { backgroundColor: '#1f2937', borderRadius: '0.75rem', padding: '1.5rem', color: '#d1d5db' };
const inputStyle = { width: '100%', minHeight: '120px', boxSizing: 'border-box', backgroundColor: '#374151', border: '1px solid #4b5563', color: '#e5e7eb', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginTop: '0.5rem' };
const labelStyle = { fontWeight: '500', color: '#9ca3af' };
const buttonStyle = { width: '100%', backgroundColor: '#34d399', color: '#111827', fontWeight: 'bold', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', marginTop: '1rem' };

function AvaliacaoAluno() {
  const { monitorId } = useParams();
  const { user } = useAuth();
  const [feedback, setFeedback] = useState('');
  const [mensagem, setMessage] = useState(''); // Estado para feedback na UI

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await postAvaliacao({ 
        alunoId: user.id, 
        monitorId: monitorId, 
        feedback: feedback 
      });
      setMessage({ type: 'success', text: 'Avaliação enviada com sucesso!' });
      setFeedback('');
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

return (
    <div style={cardStyle}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem' }}>Avaliar Monitor</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="feedback-textarea" style={labelStyle}>Deixe o seu feedback sobre a monitoria:</label>
          <textarea 
            id="feedback-textarea"
            value={feedback} 
            onChange={(e) => setFeedback(e.target.value)} 
            style={inputStyle}
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>Enviar Avaliação</button>
        {mensagem && <p style={{ marginTop: '1rem' }}>{mensagem}</p>}
      </form>
    </div>
  );
};

export default AvaliacaoAluno;
