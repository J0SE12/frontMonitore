import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = useCallback((userData) => {
    if (!(userData?.token && userData?.id && userData?.papel)) {
      console.error("Erro: Dados do usuário incompletos ao tentar fazer login");
      return;
    }
    setUser(userData); 
    localStorage.setItem("user", JSON.stringify(userData));
    
    // Redireciona com base no papel do usuário
    if (userData.papel === 'aluno') {
        navigate(`/aluno/perfil/${userData.id}`);
    } else if (userData.papel === 'monitor') {
        // CORRIGIDO: Redirecionamento para o perfil do monitor
        navigate(`/monitor/perfil/${userData.id}`); 
    } else {
        navigate('/');
    }
  }, [navigate]);

  const logout = useCallback(() => {
    console.log("Realizando logout...");
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser?.token) {
        setUser(parsedUser);
      } else {
        logout();
      }
    }
  }, [logout]);

  const contextValue = React.useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
AuthProvider.displayName = "AuthProvider";
