import React, { createContext, useContext, useState } from 'react';

type NavigationContextType = {
  headerTitle: string;
  setHeaderTitle: (title: string) => void;
};

const NavigationContext = createContext<NavigationContextType>({
  headerTitle: 'Home',
  setHeaderTitle: () => {},
});

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const [headerTitle, setHeaderTitle] = useState('Home');

  return (
    <NavigationContext.Provider value={{ headerTitle, setHeaderTitle }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => useContext(NavigationContext); 