

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { HttpError } from '../../types/apiTypes';
import ApiService from '../../apiService';
import { useApiService } from '../../useApiService';

interface Order {
  orderId: string;
  orderStatus: string;
  tableNumber: string;
  forTable: boolean;
  orderRequestDate: string;
  totalPrice: number;
  orderRequestId: string;
}


const fetchOrders = async (apiService: ApiService): Promise<Order[]> => {
  try {
    const response = await apiService.get<{ code: string; data: Order[] }>(
      '/order/campus/8c81aabb-dc05-4cf1-b9b3-1e3d3fd64ee2'
    );

    console.log('API response:', response);

    const orders = JSON.parse(JSON.stringify(response.body.data.map(order => ({
      ...order,
      orderRequestDate: new Date(order.orderRequestDate).toISOString(),
    }))));

    console.log('Orders after processing:', orders);

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const useOrders = (): UseQueryResult<Order[], HttpError> => {
  const apiService = useApiService();

  return useQuery<Order[], HttpError>({
    queryKey: ['orders'],
    queryFn: () => {
      if (!apiService) {
        return Promise.reject(new Error('No token available'));
      }
      return fetchOrders(apiService);
    },
    enabled: !!apiService, 
  });
};