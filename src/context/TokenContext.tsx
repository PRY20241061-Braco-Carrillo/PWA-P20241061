"use client"
import { createContext, useContext, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

interface TokenContextProps {
  token: string | null;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const token = session?.user?.data?.token || null;

  return (
    <TokenContext.Provider value={{ token }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context.token;
};
