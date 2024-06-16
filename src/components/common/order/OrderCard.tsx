import React from 'react';
import { Card, Text, Box, Flex } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import "./styles.css";
import { Button } from '../../ui/button';
import { useDeleteOrder } from '@/src/api/domain/orders/useDeleteOrder';

import { useOrderContext } from './OrderContext';
import { useOrderDetails } from '@/src/api/domain/orders/useViewDetail';
import { useUpdateOrderStatus } from '@/src/api/domain/orders/useUpdateOrderStatus';

interface OrderCardProps {
  orderId: string;
  orderStatus: string;
  tableNumber: string;
  forTable: boolean;
  orderRequestDate: string;
  totalPrice: number;
  userRole: string;
  orderRequestId: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  orderStatus,
  tableNumber,
  forTable,
  orderRequestDate,
  totalPrice,
  userRole,
  orderRequestId,
}) => {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const { refetchOrders } = useOrderContext();
  const deleteOrderMutation = useDeleteOrder();
  const updateOrderStatusMutation = useUpdateOrderStatus();
  const orderDetailsMutation = useOrderDetails();

  const handleDelete = async () => {
    try {
      await deleteOrderMutation.mutateAsync(orderId);
      refetchOrders();
    } catch (error) {
      console.error('Failed to delete order:', error);
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleFetchDetails = async () => {
    try {
      await orderDetailsMutation.mutateAsync(orderRequestId);
    } catch (error) {
      console.error('Failed to fetch order details:', error);
    }
  };

  const getNextStatus = (currentStatus: 'CONFIRMADO' | 'EN_PREPARACION' | 'SERVIDO' | 'ENTREGADO') => {
    switch (currentStatus) {
      case 'CONFIRMADO':
        return 'EN_PREPARACION';
      case 'EN_PREPARACION':
        return 'SERVIDO';
      case 'SERVIDO':
        return 'ENTREGADO';
      default:
        return null;
    }
  };

  const handleUpdateStatus = async () => {
    const nextStatus = getNextStatus(orderStatus as 'CONFIRMADO' | 'EN_PREPARACION' | 'SERVIDO' | 'ENTREGADO');
    if (!nextStatus) return;

    try {
      await updateOrderStatusMutation.mutateAsync({ orderStatus: nextStatus, orderId });
      refetchOrders();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };
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
          {(userRole === 'ROLE_WAITER' || userRole === 'ROLE_CHEF') && (
            <Button variant='default' onClick={() => {
              setIsDetailDialogOpen(true);
              handleFetchDetails();
            }}>Detalle</Button>
          )}
          {userRole === 'ROLE_WAITER' && (
            <>
              <Button variant='default' onClick={() => setIsDeleteDialogOpen(true)}>Delete Order</Button>

            </>
          )}
          {userRole === 'ROLE_CHEF' && (
            <>
              {orderStatus !== 'ENTREGADO' && (
                <Button variant='default' onClick={handleUpdateStatus}>Actualizar Estado</Button>
              )}

            </>
          )}
        </Flex>
      </Card>


      <Dialog.Root open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="order-details-overlay" />
          <Dialog.Content className="order-details-content">
            <Dialog.Title className="order-details-title">Order Details</Dialog.Title>
            {orderDetailsMutation.isPending ? (
              <Text className="order-details-loading">Loading...</Text>
            ) : orderDetailsMutation.isError ? (
              <Text className="order-details-error">Error loading details</Text>
            ) : (
              <Box className="order-details-box">
                <Text><strong>Order ID:</strong> {orderDetailsMutation.data?.data?.orderId}</Text>
                <Text><strong>Status:</strong> {orderDetailsMutation.data?.data?.orderStatus}</Text>
                <Text><strong>Table Number:</strong> {orderDetailsMutation.data?.data?.tableNumber}</Text>
                <Text><strong>Total Price:</strong> ${orderDetailsMutation.data?.data?.totalPrice}</Text>
                {orderDetailsMutation.data?.data?.products && (
                  <Box>
                    <Text><strong>Products:</strong></Text>
                    {orderDetailsMutation.data.data.products.map((product, index) => (
                      <Box key={index} className="order-detail-item">
                        <Text>Name: {product.name}</Text>
                        <Text>Amount: {product.productAmount}</Text>
                        {product.detail && <Text>Detail: {product.detail}</Text>}
                      </Box>
                    ))}
                  </Box>
                )}
                {orderDetailsMutation.data?.data?.combos && (
                  <Box>
                    <Text><strong>Combos:</strong></Text>
                    {orderDetailsMutation.data.data.combos.map((combo, index) => (
                      <Box key={index} className="order-detail-item">
                        <Text>Name: {combo.name}</Text>
                        <Text>Amount: {combo.comboAmount}</Text>
                        {combo.products && combo.products.map((product, i) => (
                          <Box key={i}>
                            <Text>Product: {product.name}</Text>
                            <Text>Amount: {product.productAmount}</Text>
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </Box>
                )}
                {orderDetailsMutation.data?.data?.complements && (
                  <Box>
                    <Text><strong>Complements:</strong></Text>
                    {orderDetailsMutation.data.data.complements.map((complement, index) => (
                      <Box key={index} className="order-detail-item">
                        <Text>Name: {complement.name}</Text>
                        <Text>Amount: {complement.complementAmount}</Text>
                      </Box>
                    ))}
                  </Box>
                )}
                {orderDetailsMutation.data?.data?.menus && (
                  <Box>
                    <Text><strong>Menus:</strong></Text>
                    {orderDetailsMutation.data.data.menus.map((menu, index) => (
                      <Box key={index} className="order-detail-item">
                        <Text>Name: {menu.name}</Text>
                        <Text>Amount: {menu.menuAmount}</Text>
                        {menu.products && menu.products.map((product, i) => (
                          <Box key={i}>
                            <Text>Product: {product.name}</Text>
                            <Text>Detail: {product.detail}</Text>
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </Box>
                )}
                {orderDetailsMutation.data?.data?.productPromotions && (
                  <Box>
                    <Text><strong>Promotions:</strong></Text>
                    {orderDetailsMutation.data.data.productPromotions.map((promotion, index) => (
                      <Box key={index} className="order-detail-item">
                        <Text>Name: {promotion.name}</Text>
                        <Text>Amount: {promotion.promotionAmount}</Text>
                        {promotion.products && promotion.products.map((product, i) => (
                          <Box key={i}>
                            <Text>Product: {product.name}</Text>
                            <Text>Detail: {product.detail}</Text>
                          </Box>
                        ))}
                        {promotion.complements && promotion.complements.map((complement, i) => (
                          <Box key={i}>
                            <Text>Complement: {complement.name}</Text>
                            <Text>Amount: {complement.complementAmount}</Text>
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            )}
            <Flex gap="2" justify="end">
              <Button variant={'ghost'} onClick={() => setIsDetailDialogOpen(false)}>Close</Button>
            </Flex>
            <Dialog.Close asChild>
              <button className="order-details-close-button" aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>


      <Dialog.Root open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title>Confirm Deletion</Dialog.Title>
            <Dialog.Description>Are you sure you want to delete this order?</Dialog.Description>
            <Flex gap="2" justify="end">
              <Button className='mr-6' variant={'ghost'} onClick={() => setIsDeleteDialogOpen(false)}>No</Button>
              <Button variant={'ghost'} onClick={handleDelete}>Yes</Button>
            </Flex>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Box>
  );
};

export default OrderCard;
