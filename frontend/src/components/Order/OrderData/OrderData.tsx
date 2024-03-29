import { Label, SubTitleBlue } from "../OrderCommonStyled";
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
  deliveryCity: string;
  deliveryAddress: string;
}

const OrderData: React.FC<OrderDataProps> = ({
  customerName,
  customerLastName,
  customerEmail,
  customerPhone,
  deliveryCity,
  deliveryAddress,
}) => {
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
        <Text>Доставка кур’єром Нової Пошти за адресою:</Text>
        <Data>
          {deliveryCity && deliveryAddress
            ? `${deliveryCity} ${deliveryAddress}`
            : "Вкажіть адресу доставки"}
        </Data>
      </BlockWrapper>

      <BlockWrapper>
        <SmallSubTitle>Оплата</SmallSubTitle>
        <Data>Післяплата</Data>
      </BlockWrapper>

      <BlockWrapper>
        <SmallSubTitle>Коментар</SmallSubTitle>
        <Data>Залиште коментар (опціонально)</Data>
      </BlockWrapper>
    </OrderDataWrapper>
  );
};

export default OrderData;
