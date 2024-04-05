import React, { createContext, useContext, useState } from "react";

interface OrderContextProps {
  totalQuantity: number;
  deliveryPrice: number | null;
  setBookData: (data: {
    totalQuantity: number;
    deliveryPrice: number | null;
  }) => void;
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

  console.log("OrderContextProvider", totalQuantity, deliveryPrice);
  
  const setBookData = (data: {
    totalQuantity: number;
    deliveryPrice: number | null;
  }) => {
    setTotalQuantity(data.totalQuantity);
    setDeliveryPrice(data.deliveryPrice);
  };

  const contextValue = {
    totalQuantity,
    deliveryPrice,
    setBookData,
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
