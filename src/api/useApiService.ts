// hooks/useApiService.ts
import { useMemo } from 'react';

import { useToken } from '../context/TokenContext';
import ApiService from './apiService';

export const useApiService = () => {
  const token = useToken();

  const apiService = useMemo(() => {
    if (!token) {
      return null; // No crear instancia si no hay token
    }
    return new ApiService(token);
  }, [token]);

  return apiService;
};
