"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Spinner from "@/src/components/ui/spinner";

interface TokenContextProps {
  token: string | null;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const token = session?.user?.data?.token || null;

  useEffect(() => {
    if (status === 'authenticated' || status === 'unauthenticated') {
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading || status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

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
