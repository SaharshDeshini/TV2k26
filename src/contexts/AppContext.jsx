import React, { createContext, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  return (
    <AppContext.Provider value={{
      isLoaderFinished: true,
      setIsLoaderFinished: () => {},
      isLoaderExiting: true,
      setIsLoaderExiting: () => {},
      registrationData: null,
      setRegistrationData: () => {}
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
