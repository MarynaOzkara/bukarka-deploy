import React, { createContext, useContext, useState } from "react";

interface OrderContextProps {
  totalQuantity: number;
  deliveryPrice: number | null;
  bookPrice: number | null;
  orderNumber: string | null;
  setBookData: (data: {
    totalQuantity: number;
    deliveryPrice: number | null;
    bookPrice: number | null;
    orderNumber: string | null;
  }) => void;

  setOrderNumber: (orderNumber: string | null) => void;
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

  console.log("OrderContextProvider", totalQuantity, deliveryPrice);

  const setBookData = (data: {
    totalQuantity: number;
    deliveryPrice: number | null;
    bookPrice: number | null;
  }) => {
    setTotalQuantity(data.totalQuantity);
    setDeliveryPrice(data.deliveryPrice);
    setBookPrice(data.bookPrice);
  };

  const contextValue = {
    totalQuantity,
    deliveryPrice,
    bookPrice,
    setBookData,
    orderNumber,
    setOrderNumber,
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
