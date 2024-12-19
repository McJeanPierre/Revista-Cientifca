import React, { useState, useEffect } from 'react';
import './SearchPage.css';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useState({
    title: '',
    author: '',
    publicationDate: '',
    category: ''
  });
  const [journals, setJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const response = await fetch('http://localhost:3001/journals?status=published');
      if (response.ok) {
        const data = await response.json();
        setJournals(data);
        setFilteredJournals(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = journals.filter(journal => {
      const matchTitle = journal.title.toLowerCase().includes(searchParams.title.toLowerCase());
      const matchAuthor = journal.author.toLowerCase().includes(searchParams.author.toLowerCase());
      const matchCategory = !searchParams.category || journal.category.toLowerCase() === searchParams.category.toLowerCase();
      const matchDate = !searchParams.publicationDate || 
        new Date(journal.publicationDate).toISOString().split('T')[0] === searchParams.publicationDate;

      return matchTitle && matchAuthor && matchCategory && matchDate;
    });

    setFilteredJournals(filtered);
  };

  return (
    <div className="search-page">
      <h2>Búsqueda Avanzada</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-grid">
          <div className="form-group">
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={searchParams.title}
              onChange={handleInputChange}
              placeholder="Buscar por título"
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Autor:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={searchParams.author}
              onChange={handleInputChange}
              placeholder="Buscar por autor"
            />
          </div>

          <div className="form-group">
            <label htmlFor="publicationDate">Fecha de Publicación:</label>
            <input
              type="date"
              id="publicationDate"
              name="publicationDate"
              value={searchParams.publicationDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoría:</label>
            <select
              id="category"
              name="category"
              value={searchParams.category}
              onChange={handleInputChange}
            >
              <option value="">Seleccione una categoría</option>
              <option value="Ciencias Naturales">Ciencias Naturales</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Medicina">Medicina</option>
              <option value="Ingeniería">Ingeniería</option>
              <option value="Ciencias Sociales">Ciencias Sociales</option>
            </select>
          </div>
        </div>

        <button type="submit">Buscar</button>
      </form>

      <section className="latest-editions">
        <h2>Resultados de la Búsqueda</h2>
        <div className="journals-grid">
          {filteredJournals.length > 0 ? (
            filteredJournals.map(journal => (
              <article key={journal.id} className="journal-card">
                <div className="journal-content">
                  <h3>{journal.title}</h3>
                  <p className="article-title">{journal.articleTitle}</p>
                  <p className="author">Autor: {journal.author}</p>
                  <p className="date">Fecha: {new Date(journal.publicationDate).toLocaleDateString()}</p>
                  <p className="category">Categoría: {journal.category}</p>
                  <p className="abstract">{journal.abstract}</p>
                  <div className="keywords">
                    {journal.keywords.split(',').map((keyword, index) => (
                      <span key={index} className="keyword">{keyword.trim()}</span>
                    ))}
                  </div>
                  <div className="actions">
                    <button className="view-button">Ver Artículo</button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p>No se encontraron resultados para su búsqueda.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;

