// SharedContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'sharedState';

const SharedContext = createContext();

export const SharedProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState(() => {
    // Load state from local storage or provide a default value
    const storedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return storedState || { messageFromA: '', messageFromB: '', typingMessage: '' };
  });

  const updateSharedState = (newState) => {
    setSharedState((prev) => ({ ...prev, ...newState }));
  };

  useEffect(() => {
    // Save state to local storage whenever it changes
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sharedState));
  }, [sharedState]);

  return (
    <SharedContext.Provider value={{ sharedState, updateSharedState }}>
      {children}
    </SharedContext.Provider>
  );
};

export const useSharedContext = () => {
  return useContext(SharedContext);
};
