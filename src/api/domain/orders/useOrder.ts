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

const fetchOrders = async (apiService: ApiService, locationId: string): Promise<Order[]> => {
  try {
    const response = await apiService.get<{ code: string; data: Order[] }>(
      `/order/campus/${locationId}`
    );

    console.log('API response:', response);

    const orders = response.body.data.map(order => ({
      ...order,
      orderRequestDate: new Date(order.orderRequestDate).toISOString(),
    }));

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

  const campusId = session?.user?.data?.campusId;
  const restaurantId = session?.user?.data?.restaurantId;

  const locationId = campusId || restaurantId;

  return useQuery<Order[], HttpError>({
    queryKey: ['orders', locationId],
    queryFn: () => {
      if (!apiService || !locationId) {
        return Promise.reject(new Error('No location ID available'));
      }
      return fetchOrders(apiService, locationId);
    },
    enabled: !!apiService && !!locationId,
  });
};
