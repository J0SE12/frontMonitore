// src/App.js
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./login";
import { AuthProvider, AuthContext } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import PerfilAluno from "./PerfilAluno"
import AvaliacaoAluno from "./avaliacaoaluno";

class App extends Component {
  render() {
    return (
      <Router> {/* <Router> está agora fora de <AuthProvider> */}
        <AuthProvider> {/* <AuthProvider> agora está dentro de <Router> */}
          <div className="App">
            <header className="App-header">
              <h1>Bem-vindo ao Sistema de Aulas</h1>
              <AuthContext.Consumer>
                {({ auth }) => (
                  <nav>
                    {!auth?.token && <Navigate to="/login" replace />}
                  </nav>
                )}
              </AuthContext.Consumer>
            </header>

            <Routes>
            <Route path="/login" element={<Login />} />
        <Route path="/aluno/perfil/:id" element={<PerfilAluno />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/aluno/*" element={<Navigate to="/aluno/perfil/:id" replace />} />
        <Route path="/avaliacao" element={<AvaliacaoAluno />} />
         

              {/* Rotas protegidas */}
              <Route
                path="/aluno"
                element={
                  <ProtectedRoute>
                    <PerfilAluno />
                  </ProtectedRoute>
                }

              />
               {/* Rota para o perfil do aluno específico */}
  <Route
    
  />


            </Routes>
          </div>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
