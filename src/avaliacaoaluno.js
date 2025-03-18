import React, { useState } from 'react';

function AvaliacaoAluno({ monitorId }) {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/avaliacao/${monitorId}`, 
         {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ monitorId, feedback }),
      });

      if (response.ok) {
        alert("Avaliação enviada com sucesso!");
        setFeedback(''); // Limpa o feedback após o envio
      } else {
        alert("Erro ao enviar avaliação. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
      <button type="submit">Enviar Avaliação</button>
    </form>
  );
}

export default AvaliacaoAluno;