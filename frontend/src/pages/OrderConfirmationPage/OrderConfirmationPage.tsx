import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { fetchOrderById } from "../../redux/orders/operations";
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

  useEffect(() => {
    const fetchOrder = async () => {
      if (id) {
        try {
          const order = await dispatch(fetchOrderById(id)).unwrap();
          console.log(order);
          if (order && order.orderNumber) {
            setOrderNumber(order.orderNumber.toString());
            localStorage.removeItem("cartOrderId");
            Object.keys(localStorage).forEach((key) => {
              if (key.startsWith("isBookAdded_")) {
                localStorage.removeItem(key);
              }
            });
          }
        } catch (error) {
          console.error("Error fetching order:", error);
        }
      }
    };
    fetchOrder();
  }, [dispatch, id]);

  return (
    <StyledCommonWrapper>
      <Wrapper>
        <Thanks>Дякуємо за замовлення!</Thanks>

        <OrderInfo>
          <NumberInfo>
            <NumberText>Номер вашого замовлення:</NumberText>
            <Number>{orderNumber}</Number>
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
