import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#111827', // Fundo escuro
    color: '#d1d5db',
    fontFamily: 'system-ui, sans-serif',
  },
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
  headerTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'white',
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

const Layout = ({ pageTitle, children }) => {
  const { logout } = useAuth();

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>{pageTitle || 'Monitore.me'}</h1>
        <button 
          onClick={logout} 
          style={styles.logoutButton}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#dc2626'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#ef4444'}
          onFocus={e => e.currentTarget.style.backgroundColor = '#dc2626'}
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
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  pageTitle: 'Monitore.me',
};
export default Layout;