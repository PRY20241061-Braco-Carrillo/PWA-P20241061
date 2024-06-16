import { useMutation, UseMutationResult } from '@tanstack/react-query';
import ApiService from '../../apiService';
import { useApiService } from '../../useApiService';
import { HttpError } from '../../types/apiTypes';

interface DeleteOrderResponse {
  code: string;
  data: string;
}

const deleteOrder = async (apiService: ApiService, orderId: string): Promise<DeleteOrderResponse> => {
  const response = await apiService.delete<DeleteOrderResponse>(`/order/${orderId}`);
  return response.body;
};

export const useDeleteOrder = (): UseMutationResult<DeleteOrderResponse, HttpError, string> => {
  const apiService = useApiService();

  return useMutation<DeleteOrderResponse, HttpError, string>({
    mutationFn: (orderId: string) => deleteOrder(apiService!, orderId),
    retry: (failureCount, error: HttpError) => {
      if (error.statusCode >= 500 && failureCount < 3) {
        return true;
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
