// src/PerfilMonitor.js
import React, { useEffect, useState } from "react";

const PaginaPerfilMonitor = ({ monitorId }) => {
  const [perfil, setPerfil] = useState({});

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await fetch(`/api/monitores/perfil/${monitorId}`);
        const data = await response.json();
        setPerfil(data);
      } catch (error) {
        console.error("Erro ao obter perfil do monitor:", error);
      }
    };

    fetchPerfil();
  }, [monitorId]);

  return (
    <div>
      <h3>Perfil do Monitor</h3>
      <p>Nome: {perfil.nome}</p>
      <p>Email: {perfil.email}</p>
    </div>
  );
};

export default PaginaPerfilMonitor;
