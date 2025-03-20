import React, { createContext, useContext, useState, useEffect } from 'react';

const IdContext = createContext();

export const useIdContext = () => {
  const context = useContext(IdContext);
  if (!context) {
    throw new Error('useIdContext must be used within an IdProvider');
  }
  return context;
};

export const IdProvider = ({ children }) => {
  const [id, setId] = useState(() => {
    const savedId = sessionStorage.getItem('userId');
    return savedId || null;
  });

  useEffect(() => {
    if (id) {
      sessionStorage.setItem('userId', id);
    }
  }, [id]);

  const clearId = () => {
    sessionStorage.removeItem('userId');
    setId(null);
  };

  return (
    <IdContext.Provider value={{ id, setId, clearId }}>
      {children}
    </IdContext.Provider>
  );
};