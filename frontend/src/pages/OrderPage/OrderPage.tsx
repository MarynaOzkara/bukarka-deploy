import PersonalData from "components/Order/PersonalData/PersonalData";
import {
  FlexWrapper,
  LeftPart,
  OrderPageWrapper,
  RightPart,
  Title,
} from "./OrderPage.styled";
import { StyledCommonWrapper } from "styles/CommonStyled";
import Delivery from "components/Order/Delivery/Delivery";
import Payment from "components/Order/Payment/Payment";
import Comment from "components/Order/Comment/Comment";
import BookData from "components/Order/BookData/BookData";
import OrderData from "components/Order/OrderData/OrderData";
import Submit from "components/Order/Submit/Submit";
import { useState } from "react";

const OrderPage: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const [customerName, setCustomerName] = useState<string>("");
  const [customerLastName, setCustomerLastName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [deliveryCity, setDeliveryCity] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  return (
    <StyledCommonWrapper>
      <OrderPageWrapper>
        <Title>Оформлення замовлення</Title>
        <FlexWrapper>
          <LeftPart>
            <PersonalData
              setCustomerName={setCustomerName}
              setCustomerLastName={setCustomerLastName}
              setCustomerEmail={setCustomerEmail}
              setCustomerPhone={setCustomerPhone}
            />
            <Delivery
              setDeliveryCity={setDeliveryCity}
              setDeliveryAddress={setDeliveryAddress}
            />
            <Payment />
            <Comment />
          </LeftPart>

          <RightPart>
            <BookData />
            <OrderData
              customerName={customerName}
              customerLastName={customerLastName}
              customerEmail={customerEmail}
              customerPhone={customerPhone}
              deliveryCity={deliveryCity}
              deliveryAddress={deliveryAddress}
            />
            <Submit onChange={handleCheckboxChange} />
          </RightPart>
        </FlexWrapper>
      </OrderPageWrapper>
    </StyledCommonWrapper>
  );
};

export default OrderPage;
