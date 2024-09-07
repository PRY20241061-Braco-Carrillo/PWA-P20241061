"use client";

import { Box, Card, Text, Flex, Button } from '@radix-ui/themes';
import './styles.css';
import React from 'react';
import { useReservations } from '@/src/api/domain/orders/useReservation';
import { useChangeReservationStatus } from '@/src/api/domain/orders/useUpdateReservation';

const ReservationsGrid: React.FC = () => {
  const { data: reservations, isLoading, error, refetch } = useReservations();
  const { mutate: changeStatus } = useChangeReservationStatus();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading reservations.</div>;
  }

  if (!reservations || reservations.length === 0) {
    return (
      <Box className="container">
        <Text size="3" weight="bold" className="text-center text-gray-700">
          No existen reservas en este momento.
        </Text>
      </Box>
    );
  }

  const handleConfirm = (reservationId: string) => {
    changeStatus({ reservationId, status: 'CONFIRMADO' }, {
      onSuccess: () => {
        console.log(`Reserva ${reservationId} confirmada`);
        refetch();
      },
      onError: (err) => {
        console.error('Error confirming reservation:', err);
      },
    });
  };

  const handleDeny = (reservationId: string) => {
    changeStatus({ reservationId, status: 'DENEGADO' }, {
      onSuccess: () => {
        console.log(`Reserva ${reservationId} denegada`);
        refetch();
      },
      onError: (err) => {
        console.error('Error denying reservation:', err);
      },
    });
  };

  const handleCancel = (reservationId: string) => {
    changeStatus({ reservationId, status: 'CANCELADO_ADMIN' }, {
      onSuccess: () => {
        console.log(`Reserva ${reservationId} cancelada`);
        refetch();
      },
      onError: (err) => {
        console.error('Error cancelling reservation:', err);
      },
    });
  };

  return (
    <Box className="container">
      <Flex gap="20px" className="order-list">
        {reservations.map((reservation, index) => (
          <Card key={`${reservation.reservationId}-${index}`} className="order-card">
            <Text size="2" weight="bold">{reservation.reservationId}</Text>
            <br />
            <Text>Status: <span className={`status ${reservation.reservationStatus}`}>{reservation.reservationStatus}</span></Text>
            <br />
            <Text>Date: {new Date(reservation.reservationDate).toLocaleDateString()}</Text>
            <br />
            <Text>Qualification: {reservation.userQualification}</Text>
            <br />
            <Text>Order Request ID: {reservation.orderRequestId}</Text>
            <br />
            {reservation.reservationStatus === 'POR_CONFIRMAR' && (
              <div className="button-group">
                <Button
                  onClick={() => handleConfirm(reservation.reservationId)}
                  className="confirm-button"
                >
                  CONFIRMAR RESERVA
                </Button>
                <Button
                  onClick={() => handleDeny(reservation.reservationId)}
                  className="deny-button"
                >
                  DENEGAR RESERVA
                </Button>
              </div>
            )}
            {reservation.reservationStatus !== 'CANCELADO_ADMIN' && reservation.reservationStatus !== 'CANCELADO_USUARIO' && (
              <Button
                onClick={() => handleCancel(reservation.reservationId)}
                className="cancel-button"
              >
                CANCELAR RESERVA
              </Button>
            )}
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default ReservationsGrid;
