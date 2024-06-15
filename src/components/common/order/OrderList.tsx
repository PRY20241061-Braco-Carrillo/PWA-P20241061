// components/OrderList.tsx
"use client";

import React from 'react';
import OrderCard from './OrderCard';
import "./styles.css";
import { useOrders } from '@/src/api/domain/orders/useOrder';

const OrderList: React.FC = () => {
  const { data: orders, error, isLoading } = useOrders();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading orders</div>;
  }

  return (
    <div className="order-list">
      {orders?.map((order) => (
        <OrderCard
          key={order.orderId}
          orderId={order.orderId}
          orderStatus={order.orderStatus}
          tableNumber={order.tableNumber}
          forTable={order.forTable}
          orderRequestDate={order.orderRequestDate}
          totalPrice={order.totalPrice}
        />
      ))}
    </div>
  );
};

export default OrderList;
