

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { HttpError } from '../../types/apiTypes';
import ApiService from '../../apiService';
import { useApiService } from '../../useApiService';
import { useSession } from 'next-auth/react';

interface Order {
  orderId: string;
  orderStatus: string;
  tableNumber: string;
  forTable: boolean;
  orderRequestDate: string;
  totalPrice: number;
  orderRequestId: string;
}


const fetchOrders = async (apiService: ApiService, campusId: string): Promise<Order[]> => {
  try {
    const response = await apiService.get<{ code: string; data: Order[] }>(
      `/order/campus/${campusId}`
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
  const { data: session } = useSession(); 


  return useQuery<Order[], HttpError>({
    queryKey: ['orders', session?.user?.data?.campusId],
    queryFn: () => {
      if (!apiService || !session?.user?.data?.campusId) {
        return Promise.reject(new Error('No token available'));
      }
      return fetchOrders(apiService, session.user.data.campusId);
    },
    enabled: !!apiService  && !!session?.user?.data?.campusId, 
  });
};