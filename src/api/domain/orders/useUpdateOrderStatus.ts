// hooks/useUpdateOrderStatus.ts
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import ApiService from '../../apiService';
import { useApiService } from '../../useApiService';
import { HttpError } from '../../types/apiTypes';

interface UpdateOrderStatusResponse {
  code: string;
  data: string;
}

interface UpdateOrderStatusRequest {
  orderStatus: 'CONFIRMADO' | 'EN_PREPARACION' | 'SERVIDO' | 'ENTREGADO';
  orderId: string;
}

const updateOrderStatus = async (apiService: ApiService, { orderStatus, orderId }: UpdateOrderStatusRequest): Promise<UpdateOrderStatusResponse> => {
  const response = await apiService.patch<UpdateOrderStatusRequest, UpdateOrderStatusResponse>(`/order/change-status`, { orderStatus, orderId });
  return response.body;
};

export const useUpdateOrderStatus = (): UseMutationResult<UpdateOrderStatusResponse, HttpError, UpdateOrderStatusRequest> => {
  const apiService = useApiService();

  return useMutation<UpdateOrderStatusResponse, HttpError, UpdateOrderStatusRequest>({
    mutationFn: (data: UpdateOrderStatusRequest) => updateOrderStatus(apiService!, data),
    retry: (failureCount, error: HttpError) => {
      if (error.statusCode >= 500 && failureCount < 3) {
        return true;
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
