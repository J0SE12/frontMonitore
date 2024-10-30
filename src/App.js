// src/App.js
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import PaginaAluno from "./PaginaAluno";
import PaginaMonitor from "./PaginaMonitor";
import Login from "./login";
import { AuthProvider, AuthContext } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <div className="App">
            <header className="App-header">
              <h1>Bem-vindo ao Sistema de Aulas</h1>
              <AuthContext.Consumer>
                {({ auth }) => (
                  <nav>
                    {!auth.token && <Link to="/login">Login</Link>}
                    {auth.token && (
                      <>
                        <Link to="/aluno">Página do Aluno</Link>
                        <Link to="/monitor">Página do Monitor</Link>
                      </>
                    )}
                  </nav>
                )}
              </AuthContext.Consumer>
            </header>

            <Routes>
              {/* Rota inicial direciona para login */}
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />

              {/* Rotas protegidas */}
              <Route
                path="/aluno"
                element={
                  <ProtectedRoute>
                    <PaginaAluno />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/monitor"
                element={
                  <ProtectedRoute>
                    <PaginaMonitor />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
