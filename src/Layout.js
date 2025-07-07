import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const styles = {
  // ... (estilos da página, cabeçalho, etc. - mantidos como antes)
  header: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    backdropFilter: 'blur(10px)',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #374151',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  navButton: {
    padding: '8px 12px',
    backgroundColor: 'transparent',
    color: '#d1d5db',
    border: '1px solid #4b5563',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.2s, color 0.2s',
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  },
  mainContent: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
};

const Layout = ({ pageTitle, navLinks = [], children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.navContainer}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginRight: '1rem' }}>
            {pageTitle || 'Monitore.me'}
          </h1>
          {/* Renderiza os botões de navegação */}
          {navLinks.map(link => (
            <button 
              key={link.path} 
              onClick={() => navigate(link.path)}
              style={styles.navButton}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#374151'}
              onFocus={e => e.currentTarget.style.backgroundColor = '#374151'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
              onBlur={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {link.label}
            </button>
          ))}
        </div>
        <button 
          onClick={logout} 
          style={styles.logoutButton}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#dc2626'}
          onFocus={e => e.currentTarget.style.backgroundColor = '#dc2626'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#ef4444'}
          onBlur={e => e.currentTarget.style.backgroundColor = '#ef4444'}
        >
          Sair
        </button>
      </header>
      <main style={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};
Layout.propTypes = {
  pageTitle: PropTypes.string,
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  children: PropTypes.node,
};

Layout.defaultProps = {
  pageTitle: 'Monitore.me',
  navLinks: [],
  children: null,
};
export { Layout as default }; // Exporta o Layout como padrão
export { styles as layoutStyles }; // Exporta os estilos para uso externo, se necessário