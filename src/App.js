import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Importando o roteamento
import PaginaAluno from "./aluno"; 
import PaginaMonitor from "./monitor"; 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    // Usando a variável de ambiente definida no .env
    const apiUrl = process.env.REACT_APP_BACKEND_URL;

    fetch(`${apiUrl}/testAPI`)
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
            <nav>
              {/* Links para navegar entre as páginas */}
              <Link to="/aluno">Página do Aluno</Link>
              <Link to="/monitor">Página do Monitor</Link>
            </nav>
          </header>
          
          <p className="App-intro">{this.state.apiResponse}</p>

          <Routes>
            {/* Rota para a Página do Aluno */}
            <Route path="/aluno" element={<PaginaAluno />} />

            {/* Rota para a Página do Monitor */}
            <Route path="/monitor" element={<PaginaMonitor />} />

            {/* Rota padrão (home) */}
            <Route path="/" element={<div>Bem-vindo à página inicial</div>} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;

