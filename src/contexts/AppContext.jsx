import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);
  const [isLoaderExiting, setIsLoaderExiting] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);

  return (
    <AppContext.Provider value={{
      isLoaderFinished,
      setIsLoaderFinished,
      isLoaderExiting,
      setIsLoaderExiting,
      registrationData,
      setRegistrationData
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
