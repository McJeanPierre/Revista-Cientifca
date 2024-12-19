import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import UserJournals from './UserJournals';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const [journalData, setJournalData] = useState({
    title: '',
    articleTitle: '',
    author: '',
    category: '',
    abstract: '',
    content: '',
    keywords: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJournalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = {
      ...journalData,
      userId: user.id,
      status: 'pending',
      createdAt: new Date().toISOString(),
      publicationDate: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:3001/journals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        alert('Revista enviada con éxito');
        setJournalData({
          title: '',
          articleTitle: '',
          author: '',
          category: '',
          abstract: '',
          content: '',
          keywords: ''
        });
      } else {
        throw new Error('Error al enviar la revista');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Error de conexión');
    }
  };

  return (
    <div className="user-dashboard">
      <h2>Bienvenido, {user.name}</h2>
      <form onSubmit={handleSubmit} className="journal-form">
        <div className="form-group">
          <label htmlFor="title">Título de la Revista:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={journalData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="articleTitle">Título del Artículo:</label>
          <input
            type="text"
            id="articleTitle"
            name="articleTitle"
            value={journalData.articleTitle}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Autor:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={journalData.author}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            name="category"
            value={journalData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            <option value="Ciencias Naturales">Ciencias Naturales</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Medicina">Medicina</option>
            <option value="Ingeniería">Ingeniería</option>
            <option value="Ciencias Sociales">Ciencias Sociales</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="abstract">Resumen:</label>
          <textarea
            id="abstract"
            name="abstract"
            value={journalData.abstract}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Contenido Completo:</label>
          <textarea
            id="content"
            name="content"
            value={journalData.content}
            onChange={handleInputChange}
            required
            className="content-textarea"
          />
        </div>

        <div className="form-group">
          <label htmlFor="keywords">Palabras Clave (separadas por comas):</label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            value={journalData.keywords}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Enviar Revista</button>
      </form>
      <UserJournals />
    </div>
  );
};

export default UserDashboard;

