"use client";
import React, { createContext, useContext } from 'react';
import { useOrders } from '@/src/api/domain/orders/useOrder';
import { UseQueryResult } from '@tanstack/react-query';

interface Order {
    orderId: string;
    orderStatus: string;
    tableNumber: string;
    forTable: boolean;
    orderRequestDate: string;
    totalPrice: number;
    orderRequestId: string;
  }
  

interface OrderContextProps {
  ordersQuery: UseQueryResult<Order[], Error>;
  refetchOrders: () => void;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ordersQuery = useOrders();

  return (
    <OrderContext.Provider value={{ ordersQuery, refetchOrders: ordersQuery.refetch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = (): OrderContextProps => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};
