

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { HttpError } from '../../types/apiTypes';
import ApiService from '../../apiService';
import { useApiService } from '../../useApiService';
import { useSession } from 'next-auth/react';

 interface Reservation {
    reservationId:     string;
    reservationStatus: string;
    reservationDate:   string;
    message?:           null;
    userQualification?: string;
    orderRequestId?:    string;
}




const fetchOrders = async (apiService: ApiService, campusId: string): Promise<Reservation[]> => {
  try {
    const response = await apiService.get<{ code: string; data: Reservation[] }>(
      `/reservation/campus/${campusId}`
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
  const { data: session } = useSession(); 

  return useQuery<Reservation[], HttpError>({
    queryKey: ['orders', session?.user?.data?.campusId], 
    queryFn: () => {
      if (!apiService || !session?.user?.data?.campusId) { 
        return Promise.reject(new Error('No token or campusId available'));
      }
      return fetchOrders(apiService, session.user.data.campusId); 
    },
    enabled: !!apiService && !!session?.user?.data?.campusId, 
  });
};