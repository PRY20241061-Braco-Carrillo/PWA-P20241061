import { useQuery, UseQueryResult } from '@tanstack/react-query';
import ApiService from '../../apiService';
import { useApiService } from '../../useApiService';
import { HttpError } from '../../types/apiTypes';

interface Data {
  orderId: string;
  orderStatus: string;
  tableNumber: string;
  forTable: boolean;
  orderRequestDate: Date;
  orderRequestId: string;
  totalPrice: number;
}

interface OrderResponse {
  code: string;
  data: Data;
}

const fetchOrderByTableNumber = async (apiService: ApiService, tableNumber: string): Promise<OrderResponse> => {
  const response = await apiService.get<OrderResponse>(`/order/table-number/${tableNumber.trim()}`);
  return response.body;
};

export const useOrderByTableNumber = (tableNumber: string): UseQueryResult<OrderResponse, HttpError> => {
  const apiService = useApiService();

  return useQuery<OrderResponse, HttpError>({
    queryKey: ['orderByTableNumber', tableNumber],
    queryFn: () => fetchOrderByTableNumber(apiService!, tableNumber),
    enabled: !!apiService && !!tableNumber.trim(),
    retry: (failureCount, error: HttpError) => {
      if (error.statusCode >= 500 && failureCount < 3) {
        return true;
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
