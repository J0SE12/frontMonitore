import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

// --- Ícones SVG para a Navegação ---
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>;
const ClipboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 12 2 2 4-4" /></svg>;
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
const BuildingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>;

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#111827',
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#1f2937',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #374151',
  },
  sidebarTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  nav: {
    flexGrow: 1,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    color: '#9ca3af',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    marginBottom: '0.5rem',
    transition: 'background-color 0.2s, color 0.2s',
    fontWeight: '500',
    cursor: 'pointer',
  },
  navLinkActive: {
    backgroundColor: '#374151',
    color: 'white',
  },
  navIcon: {
    marginRight: '1rem',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '0.75rem 1rem',
    color: '#f87171',
    borderRadius: '0.5rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s, color 0.2s',
    border: 'none',
    backgroundColor: 'transparent',
    textAlign: 'left',
  },
  mainContent: {
    flex: 1,
    padding: '2rem 3rem',
    overflowY: 'auto',
  },
};

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const homePath = user?.papel === 'aluno' ? `/aluno/perfil/${user.id}` : `/monitor/perfil/${user.id}`;
  
  const navLinks = user?.papel === 'aluno'
    ? [
        { path: `/aluno/aulas/${user.id}`, label: 'Minhas Aulas', icon: <BookIcon /> },
        { path: `/aluno/avaliar`, label: 'Avaliar Monitor', icon: <StarIcon /> },
      ]
    : [
        { path: `/monitor/disciplinas`, label: 'Gerir Disciplinas', icon: <BookIcon /> },
        { path: `/monitor/salas`, label: 'Gerir Salas', icon: <BuildingIcon /> },
        { path: `/monitor/presenca`, label: 'Controle de Presença', icon: <ClipboardIcon /> },
        { path: `/monitor/avaliacoes/${user.id}`, label: 'Ver Avaliações', icon: <StarIcon /> },
      ];

  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar}>
        <h1 style={styles.sidebarTitle}>Monitore.me</h1>
        <nav style={styles.nav}>
          <button
            type="button"
            role="menuitem"
            tabIndex={0}
            aria-current={location.pathname === homePath ? "page" : undefined}
            onClick={() => navigate(homePath)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(homePath);
              }
            }}
            style={{ 
              ...styles.navLink, 
              ...(location.pathname === homePath && styles.navLinkActive), 
              backgroundColor: location.pathname === homePath ? '#374151' : 'transparent',
              border: 'none',
              outline: 'none'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#374151'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = location.pathname === homePath ? '#374151' : 'transparent'}
            onFocus={e => e.currentTarget.style.backgroundColor = '#374151'}
            onBlur={e => e.currentTarget.style.backgroundColor = location.pathname === homePath ? '#374151' : 'transparent'}
          >
            <span style={styles.navIcon}><HomeIcon /></span> Página Inicial
          </button>
          {navLinks.map(link => (
            <button
              key={link.path}
              type="button"
              role="menuitem"
              tabIndex={0}
              aria-current={location.pathname === link.path ? "page" : undefined}
              onClick={() => navigate(link.path)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(link.path);
                }
              }}
              style={{
                ...styles.navLink,
                ...(location.pathname === link.path && styles.navLinkActive),
                backgroundColor: location.pathname === link.path ? '#374151' : 'transparent',
                border: 'none',
                outline: 'none'
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#374151'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = location.pathname === link.path ? '#374151' : 'transparent'}
              onFocus={e => e.currentTarget.style.backgroundColor = '#374151'}
              onBlur={e => e.currentTarget.style.backgroundColor = location.pathname === link.path ? '#374151' : 'transparent'}
            >
              <span style={styles.navIcon}>{link.icon}</span> {link.label}
            </button>
          ))}
        </nav>
        <button 
          onClick={logout} 
          style={styles.logoutButton}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#374151'}
          onFocus={e => e.currentTarget.style.backgroundColor = '#374151'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
          onBlur={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <span style={styles.navIcon}><LogoutIcon /></span> Sair
        </button>
      </aside>
      <main style={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node
};


export default Layout;
