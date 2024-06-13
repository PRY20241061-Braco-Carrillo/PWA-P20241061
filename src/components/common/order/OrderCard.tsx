// components/OrderCard.tsx

import React from 'react';
import { Card, Text, Box, Flex } from '@radix-ui/themes';

import "./styles.css";

interface OrderCardProps {
  orderId: string;
  orderStatus: string;
  tableNumber: string;
  forTable: boolean;
  orderRequestDate: string;
  totalPrice: number;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  orderStatus,
  tableNumber,
  forTable,
  orderRequestDate,
  totalPrice,
}) => {
  return (
    <Box maxWidth="400px" mb="4">
      <Card variant="surface" size="2" className="order-card">
        <Flex gap="3" direction="column">
          <Box>
            <Text as="div" size="3" weight="bold">Order ID: {orderId}</Text>
            <Text as="div" size="2" color="gray">
              Status: <span className={`status ${orderStatus.toLowerCase()}`}>{orderStatus}</span>
            </Text>
          </Box>
          <Box>
            <Text as="div" size="2" color="gray"><strong>Table Number:</strong> {tableNumber}</Text>
            <Text as="div" size="2" color="gray"><strong>For Table:</strong> {forTable ? 'Yes' : 'No'}</Text>
            <Text as="div" size="2" color="gray"><strong>Order Date:</strong> {new Date(orderRequestDate).toLocaleString()}</Text>
            <Text as="div" size="2" color="gray"><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</Text>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default OrderCard;
