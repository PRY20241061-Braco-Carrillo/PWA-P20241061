// components/OrderList.tsx

import React from 'react';
import OrderCard from './OrderCard';
import "./styles.css";

const mockOrders = [
  {
    orderId: 'b516edaf-509a-4b66-b0a7-53d1f6a4a1e6',
    orderStatus: 'CONFIRMADO',
    tableNumber: 'A12',
    forTable: true,
    orderRequestDate: '2024-06-02T10:45:23.092781',
    totalPrice: 97.97,
  },
  {
    orderId: 'a316edaf-509a-4b66-b0a7-53d1f6a4a1e6',
    orderStatus: 'PENDING',
    tableNumber: 'B5',
    forTable: false,
    orderRequestDate: '2024-06-02T11:30:23.092781',
    totalPrice: 45.00,
  },
  {
    orderId: 'c416edaf-509a-4b66-b0a7-53d1f6a4a1e6',
    orderStatus: 'CANCELED',
    tableNumber: 'C3',
    forTable: true,
    orderRequestDate: '2024-06-02T12:15:23.092781',
    totalPrice: 65.50,
  },
];

const OrderList: React.FC = () => {
  return (
    <div className="order-list">
      {mockOrders.map((order) => (
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


