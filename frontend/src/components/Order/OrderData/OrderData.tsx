import { SubTitleBlue } from "../OrderCommonStyled";
import {
  BlockWrapper,
  Data,
  OrderDataWrapper,
  SmallSubTitle,
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
  const renderData = (data: string, placeholder: string) => data || placeholder;

  return (
    <OrderDataWrapper>
      <SubTitleBlue>Дані для замовлення</SubTitleBlue>

      <BlockWrapper>
        <SmallSubTitle>Замовник</SmallSubTitle>
        <Data>
          <span>{renderData(customerName, "Вкажіть ім’я")}</span>
          <span>{renderData(customerLastName, " та прізвище")}</span>
        </Data>
        <Data>{renderData(customerEmail, "Вкажіть email")}</Data>
        <Data>{renderData(customerPhone, "Вкажіть номер телефону")}</Data>
      </BlockWrapper>

      <BlockWrapper>
        <SmallSubTitle>Доставка</SmallSubTitle>
        <Data>{deliveryMethod && deliveryMethod}</Data>
        <Data>
          {renderData(
            `${deliveryCity} ${deliveryAddress}`,
            "Вкажіть адресу доставки"
          )}
        </Data>
      </BlockWrapper>

      <BlockWrapper>
        <SmallSubTitle>Оплата</SmallSubTitle>
        <Data>{renderData(paymentMethod, "Виберіть спосіб оплати")}</Data>
      </BlockWrapper>

      <BlockWrapper>
        <SmallSubTitle>Коментар</SmallSubTitle>
        <Data>
          {renderData(orderComment, "Залиште коментар (опціонально)")}
        </Data>
      </BlockWrapper>
    </OrderDataWrapper>
  );
};

export default OrderData;
