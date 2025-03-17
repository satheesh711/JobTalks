import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the user ID
const IdContext = createContext();

// Custom hook to use the ID context
export const useIdContext = () => {
  const context = useContext(IdContext);
  if (!context) {
    throw new Error('useIdContext must be used within an IdProvider');
  }
  return context;
};

// Provider component
export const IdProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [id, setId] = useState(() => {
    const savedId = localStorage.getItem('userId');
    return savedId || null;
  });

  // Update localStorage whenever id changes
  useEffect(() => {
    if (id) {
      localStorage.setItem('userId', id);
    }
  }, [id]);

  // Clear the ID from context and localStorage
  const clearId = () => {
    localStorage.removeItem('userId');
    setId(null);
  };

  return (
    <IdContext.Provider value={{ id, setId, clearId }}>
      {children}
    </IdContext.Provider>
  );
};