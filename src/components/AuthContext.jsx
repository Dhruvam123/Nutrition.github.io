import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// AuthProvider.js

// ... (import statements)

export const AuthProvider = ({ children, instanceIdentifier }) => {
  const [flag, setFlag] = useState(false);
  const [username, setUsername] = useState('');

  // Load data from session storage on component mount
  useEffect(() => {
    const storedFlag = sessionStorage.getItem(`flag_${instanceIdentifier}`);
    const storedUsername = sessionStorage.getItem(`username_${instanceIdentifier}`);
    console.log(`Reading from session storage for ${instanceIdentifier}:`, storedFlag, storedUsername);

    if (storedFlag !== null && storedUsername !== null) {
      setFlag(JSON.parse(storedFlag));
      setUsername(storedUsername);
    }
  }, [instanceIdentifier]);

  // Save data to session storage whenever flag or username changes
  useEffect(() => {
    console.log(`Writing to session storage for ${instanceIdentifier}:`, flag, username);
    sessionStorage.setItem(`flag_${instanceIdentifier}`, JSON.stringify(flag));
    sessionStorage.setItem(`username_${instanceIdentifier}`, username);
  }, [flag, username, instanceIdentifier]);

  const setAuthData = (newFlag, newUsername) => {
    setFlag(newFlag);
    setUsername(newUsername);
  };

  return (
    <AuthContext.Provider value={{ flag, username, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
