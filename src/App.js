// src/App.js
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PaginaAluno from "./aluno";
import Login from "./login";
import { AuthProvider, AuthContext } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import PerfilAluno from "./PerfilAluno"

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

              {/* Rotas protegidas */}
              <Route
                path="/aluno"
                element={
                  <ProtectedRoute>
                    <PaginaAluno />
                  </ProtectedRoute>
                }

              />
               {/* Rota para o perfil do aluno específico */}
  <Route
    path="/aluno/perfil/:id"
    element={
      <ProtectedRoute>
        <PerfilAluno />
      </ProtectedRoute>
    }
  />


            </Routes>
          </div>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
