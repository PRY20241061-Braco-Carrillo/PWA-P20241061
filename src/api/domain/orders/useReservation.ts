

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { HttpError } from '../../types/apiTypes';
import ApiService from '../../apiService';
import { useApiService } from '../../useApiService';

 interface Reservation {
    reservationId:     string;
    reservationStatus: string;
    reservationDate:   string;
    message?:           null;
    userQualification?: string;
    orderRequestId?:    string;
}




const fetchOrders = async (apiService: ApiService): Promise<Reservation[]> => {
  try {
    const response = await apiService.get<{ code: string; data: Reservation[] }>(
      '/reservation/campus/8c81aabb-dc05-4cf1-b9b3-1e3d3fd64ee2'
    );

    console.log('API response:', response);

    const orders = JSON.parse(JSON.stringify(response.body.data.map(order => ({
      ...order,
      reservationDate: new Date(order.reservationDate).toISOString(),
    }))));

    console.log('Orders after processing:', orders);

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const useReservations = (): UseQueryResult<Reservation[], HttpError> => {
  const apiService = useApiService();

  return useQuery<Reservation[], HttpError>({
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