// components/OrderList.tsx
"use client";

import React from 'react';
import OrderCard from './OrderCard';
import "./styles.css";
import { useOrderContext } from './OrderContext';

interface Order {
  orderId: string;
  orderStatus: 'CONFIRMADO' | 'EN_PREPARACION' | 'SERVIDO' | 'ENTREGADO';
  tableNumber: string;
  forTable: boolean;
  orderRequestDate: string;
  totalPrice: number;
  orderRequestId: string;
}


interface OrderListProps {
  userRole: string;
}

const OrderList: React.FC<OrderListProps> = ({ userRole }) => {
  const { ordersQuery } = useOrderContext();
  const { data: orders, error, isLoading } = ordersQuery;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading orders</div>;
  }

  const ordersByStatus: Record<Order['orderStatus'], Order[]> = {
    CONFIRMADO: [],
    EN_PREPARACION: [],
    SERVIDO: [],
    ENTREGADO: [],
  };

  orders?.forEach(order => {
    ordersByStatus[order.orderStatus as Order['orderStatus']].push(order as Order);
  });


  return (
    <div className="order-list-container">
      {Object.keys(ordersByStatus).map(status => (
        <div key={status} className="order-column">
          <h2>{status.replace('_', ' ')}</h2>
          {ordersByStatus[status as Order['orderStatus']].map(order => (
            <OrderCard
              key={order.orderId}
              orderId={order.orderId}
              orderStatus={order.orderStatus}
              tableNumber={order.tableNumber}
              forTable={order.forTable}
              orderRequestDate={order.orderRequestDate}
              totalPrice={order.totalPrice}
              userRole={userRole}
              orderRequestId={order.orderRequestId}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default OrderList;
