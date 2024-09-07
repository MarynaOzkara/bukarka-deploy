import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "appRedux/hooks";
import { useOrderContext } from "components/Order/OrderContext";
import { fetchOrderById } from "appRedux/orders/operations";
import { StyledCommonWrapper } from "styles/CommonStyled";
import {
  Number,
  NumberInfo,
  NumberText,
  OrderInfo,
  StyledLink,
  Text,
  Thanks,
  Wrapper,
} from "./OrderConfirmationPage.styled";

const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams();
  const [orderNumber, setOrderNumber] = useState("");
  const dispatch = useAppDispatch();
  const { clearOrderData } = useOrderContext();

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 3;
    let timer: ReturnType<typeof setTimeout>;

    const fetchOrderAndCheckStatus = async () => {
      if (id && attempts < maxAttempts && !orderNumber) {
        try {
          const order = await dispatch(fetchOrderById(id)).unwrap();

          if (
            order &&
            order.status === "processing" &&
            order.orderNumber !== undefined
          ) {
            setOrderNumber(order.orderNumber.toString());
          } else {
            attempts++;
            timer = setTimeout(fetchOrderAndCheckStatus, 3000);
          }
        } catch (error) {
          console.error("Error fetching order:", error);
        }
      }
    };

    fetchOrderAndCheckStatus();
    localStorage.removeItem("orderId");

    return () => {
      clearTimeout(timer);
    };
  }, [clearOrderData, dispatch, id, orderNumber]);

  return (
    <StyledCommonWrapper>
      <Wrapper>
        <Thanks>Дякуємо за замовлення!</Thanks>

        <OrderInfo>
          <NumberInfo>
            <NumberText>Номер вашого замовлення:</NumberText>
            <Number>{!orderNumber ? "Завантажуємо..." : orderNumber}</Number>
          </NumberInfo>
          <Text>
            Ми надіслали вам лист с даними замовлення, включаючи інформацію про
            доставку та оплату.
          </Text>
        </OrderInfo>
        <StyledLink to="/">Повернутися на Головну сторінку.</StyledLink>
      </Wrapper>
    </StyledCommonWrapper>
  );
};

export default OrderConfirmationPage;
