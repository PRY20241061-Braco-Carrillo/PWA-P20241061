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
import { useLocale, useTranslations } from "next-intl";

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
  const locale = useLocale();
  const t = useTranslations("OrderCard");
  const tD = useTranslations("OrderDetails");
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
            <Text as="div" size="3" weight="bold">{t("orderId")}: {orderId}</Text>
            <Text as="div" size="2" color="gray">
              {t("status")}: <span className={`status ${orderStatus.toLowerCase()}`}>{orderStatus}</span>
            </Text>
          </Box>
          <Box>
            <Text as="div" size="2" color="gray"><strong>{t("tableNumber")}:</strong> {tableNumber}</Text>
            <Text as="div" size="2" color="gray"><strong>{t("forTable")}:</strong> {forTable ? 'Yes' : 'No'}</Text>
            <Text as="div" size="2" color="gray"><strong>{t("orderDate")}:</strong> {new Date(orderRequestDate).toLocaleString()}</Text>
            <Text as="div" size="2" color="gray"><strong>{t("total")}:</strong> ${totalPrice.toFixed(2)}</Text>
          </Box>
          <Box className="flex space-x-4">  {/* Añadimos espacio entre los botones */}
            {(userRole === 'ROLE_WAITER' || userRole === 'ROLE_CHEF') && (
              <Button variant='default' onClick={() => {
                setIsDetailDialogOpen(true);
                handleFetchDetails();
              }}>Detalle</Button>
            )}
            {userRole === 'ROLE_WAITER' && (
              <Button variant='default' onClick={() => setIsDeleteDialogOpen(true)}>Delete Order</Button>
            )}
            {userRole === 'ROLE_CHEF' && (
              orderStatus !== 'ENTREGADO' && (
                <Button variant='default' onClick={handleUpdateStatus}>Actualizar Estado</Button>
              )
            )}
          </Box>
        </Flex>
      </Card>


      <Dialog.Root open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content">
            <Dialog.Title className="dialog-title">{tD('title')}</Dialog.Title>
            {orderDetailsMutation.isPending ? (
              <Text className="dialog-loading">Loading...</Text>
            ) : orderDetailsMutation.isError ? (
              <Text className="dialog-error">Error loading details</Text>
            ) : (
              <Box className="dialog-box">
                <Text><strong>{tD('orderId')}:</strong> {orderDetailsMutation.data?.data?.orderId}</Text>
                <Text><strong>{tD('status')}:</strong> {orderDetailsMutation.data?.data?.orderStatus}</Text>
                <Text><strong>{tD('tableNumber')}:</strong> {orderDetailsMutation.data?.data?.tableNumber}</Text>
                <Text><strong>{tD('totalPrice')}:</strong> ${orderDetailsMutation.data?.data?.totalPrice}</Text>
                {orderDetailsMutation.data?.data?.products && (
                  <Box>
                    <Text><strong>{tD('products')}:</strong></Text>
                    {orderDetailsMutation.data.data.products.map((product, index) => (
                      <Box key={index} className="order-detail-item">
                        <Text>{tD('name')}: {product.name}</Text>
                        <br />
                        <Text>{tD('amount')}: {product.productAmount}</Text>
                        {product.detail && <Text>Detail: {product.detail}</Text>}
                      </Box>
                    ))}
                  </Box>
                )}
                {orderDetailsMutation.data?.data?.combos && (
                  <Box>
                    <Text><strong>{tD('combos')}:</strong></Text>
                    {orderDetailsMutation.data.data.combos.map((combo, index) => (
                      <Box key={index} className="order-detail-item">
                        <Text>{tD('name')}: {combo.name}</Text>
                        <br />
                        <Text>{tD('amount')}: {combo.comboAmount}</Text>
                        {combo.products && combo.products.map((product, i) => (
                          <Box key={i}>
                            <Text>{tD('product')}: {product.name}</Text>
                            <br />
                            <Text>{tD('amount')}: {product.productAmount}</Text>
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </Box>
                )}
                {orderDetailsMutation.data?.data?.complements && (
                  <Box>
                    <Text><strong>{tD('complements')}:</strong></Text>
                    {orderDetailsMutation.data.data.complements.map((complement, index) => (
                      <Box key={index} className="order-detail-item">
                        <Text>{tD('name')}: {complement.name}</Text>
                        <br />
                        <Text>{tD('amount')}: {complement.complementAmount}</Text>
                      </Box>
                    ))}
                  </Box>
                )}
                {orderDetailsMutation.data?.data?.menus && (
                  <Box>
                    <Text><strong>{tD('menus')}:</strong></Text>
                    {orderDetailsMutation.data.data.menus.map((menu, index) => (
                      <Box key={index} className="order-detail-item">
                        <Text>{tD('name')}: {menu.name}</Text>
                        <br />
                        <Text>{tD('amount')}: {menu.menuAmount}</Text>
                        {menu.products && menu.products.map((product, i) => (
                          <Box key={i}>
                            <Text>{tD('product')}: {product.name}</Text>
                            <br />
                            <Text>{tD('detail')}: {product.detail}</Text>
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </Box>
                )}
                {orderDetailsMutation.data?.data?.productPromotions && (
                  <Box>
                    <Text><strong>{tD('promotions')}:</strong></Text>
                    {orderDetailsMutation.data.data.productPromotions.map((promotion, index) => (
                      <Box key={index} className="order-detail-item">
                        <Text>{tD('name')}: {promotion.name}</Text>
                        <br />
                        <Text>{tD('amount')}: {promotion.promotionAmount}</Text>
                        {promotion.products && promotion.products.map((product, i) => (
                          <Box key={i}>
                            <Text>{tD('product')}: {product.name}</Text>
                            <br />
                            <Text>{tD('detail')}: {product.detail}</Text>
                          </Box>
                        ))}
                        {promotion.complements && promotion.complements.map((complement, i) => (
                          <Box key={i}>
                            <Text>{tD('complement')}: {complement.name}</Text>
                            <br />
                            <Text>{tD('amount')}: {complement.complementAmount}</Text>
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </Box>
                )}        </Box>
            )}
           
            <Dialog.Close asChild>
              <button className="dialog-close-button" aria-label="Close">
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
