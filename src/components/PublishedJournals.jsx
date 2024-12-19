import React, { useState, useEffect } from 'react';
import './PublishedJournals.css';

const PublishedJournals = () => {
 const [publishedJournals, setPublishedJournals] = useState([]);

 useEffect(() => {
   fetchPublishedJournals();
 }, []);

 const fetchPublishedJournals = async () => {
   try {
     const response = await fetch('http://localhost:3001/journals?status=published');
     if (response.ok) {
       const data = await response.json();
       setPublishedJournals(data);
     } else {
       console.error('Error fetching published journals');
     }
   } catch (error) {
     console.error('Error:', error);
   }
 };

 return (
   <div className="published-journals">
     <h2>Revistas Publicadas</h2>
     <div className="journals-grid">
       {publishedJournals.map(journal => (
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
       ))}
     </div>
   </div>
 );
};

export default PublishedJournals;

