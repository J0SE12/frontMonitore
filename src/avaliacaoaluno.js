import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { postAvaliacao } from './services/api'; // 👈 Use o serviço

function AvaliacaoAluno() {
  const { monitorId } = useParams();
  const { user } = useAuth();
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState(''); // Estado para feedback na UI

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
    <form onSubmit={handleSubmit}>
      <h3>Avaliar Monitor</h3>
      <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} required />
      <button type="submit">Enviar Avaliação</button>
      {message && (
        <p style={{ color: message.type === 'error' ? 'red' : 'green' }}>
          {message.text}
        </p>
      )}
    </form>
  );
}

export default AvaliacaoAluno;
