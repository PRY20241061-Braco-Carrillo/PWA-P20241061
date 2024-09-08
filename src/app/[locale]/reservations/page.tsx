"use client";

import { Box, Card, Text, Flex, Button } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import './styles.css';
import React from 'react';
import { useReservations } from '@/src/api/domain/orders/useReservation';
import { useChangeReservationStatus } from '@/src/api/domain/orders/useUpdateReservation';

const ReservationsGrid: React.FC = () => {
  const { data: reservations, isLoading, error, refetch } = useReservations();
  const { mutate: changeStatus } = useChangeReservationStatus();
  const t = useTranslations('Reservations');

  if (isLoading) {
    return <div>{t('loading')}</div>;
  }

  if (error) {
    return <div>{t('error')}</div>;
  }

  if (!reservations || reservations.length === 0) {
    return (
      <Box className="container">
        <Text size="3" weight="bold" className="text-center text-gray-700">
          {t('noReservations')}
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
            <Text>
              {t('status')}: <span className={`status-${reservation.reservationStatus.toLowerCase()}`}>{t(`statusI.${reservation.reservationStatus}`)}</span>
            </Text>
            <br />
            <Text>{t('date')}: {new Date(reservation.reservationDate).toLocaleDateString()}</Text>
            <br />
            <Text>{t('qualification')}: {reservation.userQualification}</Text>
            <br />
            <Text>{t('orderRequestId')}: {reservation.orderRequestId}</Text>
            <br />
            {reservation.reservationStatus === 'POR_CONFIRMAR' && (
              <div className="button-group  p-2">
                <Button
                  onClick={() => handleConfirm(reservation.reservationId)}
                  className="confirm-button p-2"
                >
                  {t('confirmReservation')}
                </Button>
                <Button
                  onClick={() => handleDeny(reservation.reservationId)}
                  className="deny-button  p-2"
                >
                  {t('denyReservation')}
                </Button>
              </div>
            )}
            {reservation.reservationStatus !== 'CANCELADO_ADMIN' && reservation.reservationStatus !== 'CANCELADO_USUARIO' && (
              <Button
                onClick={() => handleCancel(reservation.reservationId)}
                className="cancel-button  p-2"
              >
                {t('cancelReservation')}
              </Button>
            )}
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default ReservationsGrid;
