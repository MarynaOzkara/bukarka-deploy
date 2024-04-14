import PropTypes from "prop-types";
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
import { StyledCommonWrapper } from "styles/CommonStyled";
import { useParams } from "react-router-dom";
import { useOrderContext } from "components/Order/OrderContext";
import { useEffect, useState } from "react";

const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams();
  // const { orderNumber } = useOrderContext();
  // console.log(orderNumber);
  console.log(id);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    fetch(`https://bukarka.onrender.com/api/orders/${id}`)
      .then((response) => response.json())
      .then((data) => {
        data && console.log(data);
        setOrderNumber(data.orderNumber);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  }, [id]);

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

OrderConfirmationPage.propTypes = {};

export default OrderConfirmationPage;
