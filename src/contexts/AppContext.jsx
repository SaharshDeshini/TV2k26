import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isLoaderFinished, setIsLoaderFinished] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!(window.__hasShownIntro || window.__introTransitionComplete);
    }
    return false;
  });
  const [isLoaderExiting, setIsLoaderExiting] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!(window.__hasShownIntro || window.__introTransitionComplete);
    }
    return false;
  });
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
