import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  // console.log("OrderContextProvider", totalQuantity, deliveryPrice);

  const setBookData = (data: {
    totalQuantity: number;
    deliveryPrice: number | null;
    bookPrice: number | null;
  }) => {
    setTotalQuantity(data.totalQuantity);
    setDeliveryPrice(data.deliveryPrice);
    setBookPrice(data.bookPrice);
  };

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`https://bukarka.onrender.com/api/orders/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // data && console.log(data);
        setOrderNumber(data.orderNumber);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  }, [id]);

  const contextValue = {
    totalQuantity,
    deliveryPrice,
    bookPrice,
    setBookData,
    orderNumber,
    setOrderNumber,
  };

  // console.log(orderNumber);

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
