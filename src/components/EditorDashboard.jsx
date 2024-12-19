import React, { useState, useEffect } from 'react';
import './EditorDashboard.css';

const EditorDashboard = () => {
 const [reviews, setReviews] = useState([]);

 useEffect(() => {
   fetchReviews();
 }, []);

 const fetchReviews = async () => {
   try {
     const response = await fetch('http://localhost:3001/journals');
     if (response.ok) {
       const data = await response.json();
       setReviews(data);
     } else {
       console.error('Error fetching reviews');
     }
   } catch (error) {
     console.error('Error:', error);
   }
 };

 const handlePublish = async (id) => {
   try {
     const response = await fetch(`http://localhost:3001/journals/${id}`, {
       method: 'PATCH',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ status: 'published' }),
     });

     if (response.ok) {
       alert('Revista publicada con éxito');
       fetchReviews();
     } else {
       alert('Error al publicar la revista');
     }
   } catch (error) {
     console.error('Error:', error);
     alert('Error de conexión');
   }
 };

 const handleDelete = async (id) => {
   if (window.confirm('¿Está seguro de que desea eliminar esta revista?')) {
     try {
       const response = await fetch(`http://localhost:3001/journals/${id}`, {
         method: 'DELETE',
       });

       if (response.ok) {
         alert('Revista eliminada con éxito');
         fetchReviews();
       } else {
         alert('Error al eliminar la revista');
       }
     } catch (error) {
       console.error('Error:', error);
       alert('Error de conexión');
     }
   }
 };

 const handleRequestChanges = async (id) => {
   const message = prompt('Ingrese el mensaje para el autor:');
   if (message) {
     try {
       const response = await fetch(`http://localhost:3001/journals/${id}`, {
         method: 'PATCH',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ status: 'changes_requested', editorMessage: message }),
       });

       if (response.ok) {
         alert('Solicitud de cambios enviada');
         fetchReviews();
       } else {
         alert('Error al solicitar cambios');
       }
     } catch (error) {
       console.error('Error:', error);
       alert('Error de conexión');
     }
   }
 };

 const getStatusColor = (status) => {
   switch (status) {
     case 'pending':
       return 'status-pending';
     case 'approved':
       return 'status-approved';
     case 'published':
       return 'status-published';
     case 'changes_requested':
       return 'status-changes';
     default:
       return '';
   }
 };

 return (
   <div className="editor-dashboard">
     <h2>Panel del Editor</h2>
     <div className="journals-grid">
       {reviews.map(review => (
         <article key={review.id} className="journal-card">
           <div className="journal-content">
             <h3>{review.title}</h3>
             <p className="article-title">{review.articleTitle}</p>
             <p className="author">Autor: {review.author}</p>
             <p className="category">Categoría: {review.category}</p>
             <p className={`status ${getStatusColor(review.status)}`}>
               Estado: {review.status}
             </p>
             <p className="abstract">{review.abstract}</p>
             <div className="keywords">
               {review.keywords.split(',').map((keyword, index) => (
                 <span key={index} className="keyword">{keyword.trim()}</span>
               ))}
             </div>
             <div className="actions">
               {review.status !== 'published' && (
                 <button onClick={() => handlePublish(review.id)}>Publicar</button>
               )}
               {review.status !== 'changes_requested' && (
                 <button onClick={() => handleRequestChanges(review.id)}>Solicitar Cambios</button>
               )}
               <button 
                 onClick={() => handleDelete(review.id)}
                 className="delete-button"
               >
                 Eliminar
               </button>
             </div>
           </div>
         </article>
       ))}
     </div>
   </div>
 );
};

export default EditorDashboard;

