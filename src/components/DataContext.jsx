// DataContext.js

import { createContext, useContext, useEffect, useState} from 'react';

const DataContext = createContext();

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataContextProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [loginData, setLoginData] = useState(null);
  const handleLoginSubmit = (formData) => {

    setLoginData(formData);
    console.log('Form Data submitted:', formData); // Check this log for the correct data
   
  };
  useEffect(() => {
    if (loginData) {
      localStorage.setItem('logindata', JSON.stringify(loginData));
    }
  }, [loginData]);
  useEffect(()=>{
    const storedFormData = JSON.parse(localStorage.getItem('logindata'));
  if (storedFormData) {
    setLoginData(storedFormData);
  }
  },[]);
 

  console.log('DataProvider loginData:', loginData);

  return (
    <DataContext.Provider value={{ loginData, handleLoginSubmit ,setLoginData}}>
      {children}
    </DataContext.Provider>
  );
};