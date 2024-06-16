
import React from 'react';
import OrderList from './OrderList';
import { OrderProvider } from './OrderContext';

interface OrderListWrapperProps {
  userRole: string;
}


const OrderListWrapper: React.FC<OrderListWrapperProps> = ({ userRole }) => {
  return (
    <OrderProvider>
      <OrderList userRole={userRole} />
    </OrderProvider>
  );
};

export default OrderListWrapper;
