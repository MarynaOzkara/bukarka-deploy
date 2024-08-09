import React, { createContext, useContext, useState } from "react";

interface OrderContextProps {
  totalQuantity: number;
  deliveryPrice: number | null;
  bookPrice: number | null;
  orderNumber: string | null;
  orderId: string | null;
  setBookData: (data: {
    totalQuantity: number;
    deliveryPrice: number | null;
    bookPrice: number | null;
    orderNumber: string | null;
  }) => void;
  setOrderNumber: (orderNumber: string | null) => void;
  setOrderId: (orderId: string | null) => void;
  clearOrderData: () => void;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error(
      "useOrderContext must be used within an OrderContextProvider"
    );
  }
  return context;
};

interface OrderContextProviderProps {
  children: React.ReactNode;
}

export const OrderContextProvider: React.FC<OrderContextProviderProps> = ({
  children,
}) => {
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [deliveryPrice, setDeliveryPrice] = useState<number | null>(null);
  const [bookPrice, setBookPrice] = useState<number | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const setBookData = (data: {
    totalQuantity: number;
    deliveryPrice: number | null;
    bookPrice: number | null;
    orderNumber: string | null;
  }) => {
    setTotalQuantity(data.totalQuantity);
    setDeliveryPrice(data.deliveryPrice);
    setBookPrice(data.bookPrice);
    setOrderNumber(data.orderNumber);
  };

  const clearOrderData = () => {
    setTotalQuantity(0);
    setDeliveryPrice(null);
    setBookPrice(null);
    setOrderNumber(null);
    setOrderId(null);
  };

  const contextValue = {
    totalQuantity,
    deliveryPrice,
    bookPrice,
    orderNumber,
    orderId,
    setBookData,
    setOrderNumber,
    setOrderId,
    clearOrderData,
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
