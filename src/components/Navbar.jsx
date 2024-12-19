import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div>
      {/* Barra superior (div-top) vacía o con otros elementos si lo deseas */}
      <div className="div-top">
        {/* Puedes añadir contenido aquí si lo necesitas, por ejemplo, iconos, enlaces, o dejarlo vacío */}
      </div>

      {/* Navbar principal */}
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src="/Logo1.png" alt="Logo" className="logo-img" />
          </Link>
        </div>
        <div className="navbar-links">
        <Link to="/search">Buscar Revistas</Link>
          {user ? (
            <>
              {user.role === 'user' && <Link to="/user-dashboard">Panel de Usuario</Link>}
              {user.role === 'reviewer' && <Link to="/reviewer-dashboard">Panel de Revisor</Link>}
              {user.role === 'editor' && <Link to="/editor-dashboard">Panel de Editor</Link>}
              <button onClick={logout} className="logout-button">Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/login">Iniciar Sesión</Link>
              <Link to="/register">Registrarse</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
