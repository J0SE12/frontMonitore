const submitAvaliacao = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/avaliacao`, {
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
  