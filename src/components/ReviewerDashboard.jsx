import React, { useState, useEffect } from 'react';
import './ReviewerDashboard.css';

const ReviewerDashboard = () => {
 const [pendingReviews, setPendingReviews] = useState([]);

 useEffect(() => {
   fetchPendingReviews();
 }, []);

 const fetchPendingReviews = async () => {
   try {
     const response = await fetch('http://localhost:3001/journals?status=pending');
     if (response.ok) {
       const data = await response.json();
       setPendingReviews(data);
     } else {
       console.error('Error fetching pending reviews');
     }
   } catch (error) {
     console.error('Error:', error);
   }
 };

 const handleReview = async (id, status) => {
   try {
     const response = await fetch(`http://localhost:3001/journals/${id}`, {
       method: 'PATCH',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ status: status === 'approve' ? 'approved' : 'rejected' }),
     });

     if (response.ok) {
       alert(`Revista ${status === 'approve' ? 'aprobada' : 'rechazada'}`);
       fetchPendingReviews();
     } else {
       alert('Error al actualizar el estado de la revista');
     }
   } catch (error) {
     console.error('Error:', error);
     alert('Error de conexión');
   }
 };

 return (
   <div className="reviewer-dashboard">
     <h2>Panel del Revisor</h2>
     <div className="journals-grid">
       {pendingReviews.map(review => (
         <article key={review.id} className="journal-card">
           <div className="journal-content">
             <h3>{review.title}</h3>
             <p className="article-title">{review.articleTitle}</p>
             <p className="author">Autor: {review.author}</p>
             <p className="category">Categoría: {review.category}</p>
             <p className="abstract">{review.abstract}</p>
             <div className="keywords">
               {review.keywords.split(',').map((keyword, index) => (
                 <span key={index} className="keyword">{keyword.trim()}</span>
               ))}
             </div>
             <div className="actions">
               <button onClick={() => handleReview(review.id, 'approve')} className="approve-button">Aprobar</button>
               <button onClick={() => handleReview(review.id, 'reject')} className="reject-button">Rechazar</button>
             </div>
           </div>
         </article>
       ))}
     </div>
   </div>
 );
};

export default ReviewerDashboard;

