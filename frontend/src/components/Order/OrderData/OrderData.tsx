import { SubTitleBlue } from "../OrderCommonStyled";
import {
  BlockWrapper,
  Data,
  OrderDataWrapper,
  SmallSubTitle,
  Text,
} from "./OrderData.styled";

interface OrderDataProps {
  customerName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryMethod: string;
  deliveryCity: string;
  deliveryAddress: string;
  paymentMethod: string;
  orderComment: string;
}

const OrderData: React.FC<OrderDataProps> = ({
  customerName,
  customerLastName,
  customerEmail,
  customerPhone,
  deliveryMethod,
  deliveryCity,
  deliveryAddress,
  paymentMethod,
  orderComment,
}) => {
  console.log(deliveryMethod);
  return (
    <OrderDataWrapper>
      <SubTitleBlue>Дані для замовлення</SubTitleBlue>

      <BlockWrapper>
        <SmallSubTitle>Замовник</SmallSubTitle>
        <Data>
          <span>{customerName ? customerName : "Вкажіть ім’я"}</span>{" "}
          <span>{customerLastName ? customerLastName : "та прізвище"}</span>
        </Data>
        <Data>{customerEmail ? customerEmail : "Вкажіть email"}</Data>
        <Data>{customerPhone ? customerPhone : "Вкажіть номер телефону"}</Data>
      </BlockWrapper>

      <BlockWrapper>
        <SmallSubTitle>Доставка</SmallSubTitle>
        <Text>{deliveryMethod && deliveryMethod}</Text>
        <Data>
          {deliveryCity && deliveryAddress
            ? `${deliveryCity} ${deliveryAddress}`
            : "Вкажіть адресу доставки"}
        </Data>
      </BlockWrapper>

      <BlockWrapper>
        <SmallSubTitle>Оплата</SmallSubTitle>
        <Data>{paymentMethod ? paymentMethod : "Виберіть спосіб оплати"}</Data>
      </BlockWrapper>

      <BlockWrapper>
        <SmallSubTitle>Коментар</SmallSubTitle>
        <Data>
          {orderComment ? orderComment : "Залиште коментар (опціонально)"}
        </Data>
      </BlockWrapper>
    </OrderDataWrapper>
  );
};

export default OrderData;
