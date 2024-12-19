import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

function LoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`http://localhost:3001/users?email=${credentials.email}`);
      const users = await response.json();

      if (users.length === 0) {
        setError('Usuario no encontrado');
        return;
      }

      const user = users[0];
      if (user.password !== credentials.password) {
        setError('Contraseña incorrecta');
        return;
      }

      login(user);
      navigate('/');
    } catch (error) {
      setError('Error de conexión');
    }
  };

  return (
    <div className="login-page">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={credentials.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={credentials.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default LoginPage;

