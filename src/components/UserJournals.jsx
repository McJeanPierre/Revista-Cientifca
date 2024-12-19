import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './UserJournals.css';

const UserJournals = () => {
  const { user } = useAuth();
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    fetchUserJournals();
  }, [user.id]);

  const fetchUserJournals = async () => {
    try {
      const response = await fetch(`http://localhost:3001/journals?userId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setJournals(data);
      } else {
        console.error('Error fetching user journals');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="user-journals">
      <h2>Mis Revistas</h2>
      <ul>
        {journals.map(journal => (
          <li key={journal.id}>
            <h3>{journal.title}</h3>
            <p>{journal.content}</p>
            <p>Estado: {journal.status}</p>
            {journal.editorMessage && (
              <p className="editor-message">Mensaje del editor: {journal.editorMessage}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserJournals;

