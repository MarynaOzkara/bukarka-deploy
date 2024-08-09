import React, { createContext, useContext, useState } from "react";

interface OrderContextProps {
  totalQuantity: number;
  deliveryPrice: number | null;
  bookPrice: number | null;
  orderNumber: string | null;
  orderId: string | null;
  isBookAdded: { [key: string]: boolean };
  setBookData: (data: {
    totalQuantity: number;
    deliveryPrice: number | null;
    bookPrice: number | null;
    orderNumber: string | null;
  }) => void;
  setOrderNumber: (orderNumber: string | null) => void;
  setOrderId: (orderId: string | null) => void;
  markBookAsAdded: (bookId: string) => void;
  isBookInCart: (bookId: string) => boolean;
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
  const [isBookAdded, setIsBookAdded] = useState<{ [key: string]: boolean }>(
    {}
  );
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

  const markBookAsAdded = (bookId: string) => {
    setIsBookAdded((prev) => ({ ...prev, [bookId]: true }));
  };

  const isBookInCart = (bookId: string) => {
    return Boolean(isBookAdded[bookId]);
  };

  const clearOrderData = () => {
    setTotalQuantity(0);
    setDeliveryPrice(null);
    setBookPrice(null);
    setOrderNumber(null);
    setOrderId(null);
    setIsBookAdded({});
  };

  const contextValue = {
    totalQuantity,
    deliveryPrice,
    bookPrice,
    orderNumber,
    orderId,
    isBookAdded,
    setBookData,
    setOrderNumber,
    setOrderId,
    markBookAsAdded,
    isBookInCart,
    clearOrderData,
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
