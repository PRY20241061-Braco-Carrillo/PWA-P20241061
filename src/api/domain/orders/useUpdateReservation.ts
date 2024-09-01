
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import ApiService from '../../apiService';
import { useApiService } from '../../useApiService';
import { HttpError } from '../../types/apiTypes';

interface ChangeReservationStatusResponse {
  code: string;
  data: string;
}

interface ChangeReservationStatusRequest {
  reservationId: string;
  status: 'CONFIRMADO' | 'DENEGADO' | 'CANCELADO_ADMIN';
}

const changeReservationStatus = async (
  apiService: ApiService,
  { reservationId, status }: ChangeReservationStatusRequest
): Promise<ChangeReservationStatusResponse> => {
  const response = await apiService.patch<ChangeReservationStatusRequest, ChangeReservationStatusResponse>(
    `/reservation/change-status`,
    { reservationId, status }
  );
  return response.body;
};

export const useChangeReservationStatus = (): UseMutationResult<
  ChangeReservationStatusResponse,
  HttpError,
  ChangeReservationStatusRequest
> => {
  const apiService = useApiService();

  return useMutation<ChangeReservationStatusResponse, HttpError, ChangeReservationStatusRequest>({
    mutationFn: (data: ChangeReservationStatusRequest) => changeReservationStatus(apiService!, data),
    retry: (failureCount, error: HttpError) => {
      if (error.statusCode >= 500 && failureCount < 3) {
        return true;
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
