// hooks/useOrderDetails.ts
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import ApiService from '../../apiService';
import { useApiService } from '../../useApiService';
import { HttpError } from '../../types/apiTypes';

interface OrderDetailRequest {
  code?: string;
  data?: Data;
}

interface Data {
  orderId?: string;
  orderStatus?: string;
  tableNumber?: string;
  forTable?: boolean;
  orderRequestDate?: Date;
  totalPrice?: number;
  products?: ComboProduct[];
  complements?: Complement[];
  combos?: Combo[];
  productPromotions?: ProductPromotion[];
  menus?: Menu[];
}

interface Combo {
  name?: string;
  comboAmount?: number;
  orderComboId?: string;
  products?: ComboProduct[];
  complements?: Complement[];
}

interface Complement {
  name?: string;
  complementAmount?: number;
}

interface ComboProduct {
  productAmount?: number;
  name?: string;
  detail?: string;
}

interface Menu {
  name?: string;
  menuAmount?: number;
  orderMenuId?: string;
  products?: MenuProduct[];
}

interface MenuProduct {
  name?: string;
  detail?: string;
}

interface ProductPromotion {
  name?: string;
  promotionAmount?: number;
  orderPromotionId?: string;
  products?: MenuProduct[];
  complements?: Complement[];
}



const fetchOrderDetails = async (apiService: ApiService, orderId: string): Promise<OrderDetailRequest> => {
    const response = await apiService.get<OrderDetailRequest>(`/order/order-request/${orderId}`);
    return response.body;
  };
  
  export const useOrderDetails = (): UseMutationResult<OrderDetailRequest, HttpError, string> => {
    const apiService = useApiService();
  
    return useMutation<OrderDetailRequest, HttpError, string>({
      mutationFn: (orderId: string) => fetchOrderDetails(apiService!, orderId),
      retry: (failureCount, error: HttpError) => {
        if (error.statusCode >= 500 && failureCount < 3) {
          return true;
        }
        return false;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });
  };