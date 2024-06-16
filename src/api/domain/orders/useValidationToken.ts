



import { useQuery, UseQueryResult } from '@tanstack/react-query';
import ApiService from '../../apiService';
import { useApiService } from '../../useApiService';
import { HttpError } from '../../types/apiTypes';

interface ValidationToken {
  code: string;
  data: Data;
}

interface Data {
  orderRequestId: string;
}

const validateToken = async (apiService: ApiService, token: string): Promise<ValidationToken> => {
  const response = await apiService.post<string, ValidationToken>(
    `/order-request/confirmation-token/${token}`
  );
  return response.body;
};

export const useValidationToken = (token: string): UseQueryResult<ValidationToken, HttpError> => {
  const apiService = useApiService();

  return useQuery<ValidationToken, HttpError>({
    queryKey: ['validationToken', token],
    queryFn: () => validateToken(apiService!, token),
    enabled: !!apiService && !!token,
    retry: (failureCount, error: HttpError) => {
      if (error.statusCode >= 500 && failureCount < 3) {
        return true;
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
