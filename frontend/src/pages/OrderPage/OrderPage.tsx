import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import PersonalData from "components/Order/PersonalData";
import Delivery from "components/Order/Delivery";
import Payment from "components/Order/Payment";
import Comment from "components/Order/Comment";
import BookData from "components/Order/BookData";
import OrderData from "components/Order/OrderData";
import Submit from "components/Order/Submit";
import { useAppDispatch } from "../../redux/hooks";
import { updateOrderInfo } from "../../redux/orders/operations";
import { StyledCommonWrapper } from "styles/CommonStyled";
import {
  FlexWrapper,
  LeftPart,
  OrderPageWrapper,
  RightPart,
  Title,
} from "./OrderPage.styled";
import {
  validationCommentSchema,
  validationDeliverySchema,
  validationPaymentSchema,
  validationPersonalDataSchema,
} from "utils/validationSchema";

const OrderPage: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [customerName, setCustomerName] = useState<string>("");
  const [customerLastName, setCustomerLastName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [deliveryCity, setDeliveryCity] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [orderComment, setOrderComment] = useState<string>("");

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const validateForm = async () => {
      try {
        await validationPersonalDataSchema.validate(
          {
            name: customerName,
            lastName: customerLastName,
            email: customerEmail,
            phone: customerPhone,
          },
          { abortEarly: false }
        );
        await validationDeliverySchema.validate(
          {
            city: deliveryCity,
            address: deliveryAddress,
            deliveryMethod: deliveryMethod,
          },
          { abortEarly: false }
        );
        await validationPaymentSchema.validate(
          {
            payment: paymentMethod,
          },
          { abortEarly: false }
        );
        await validationCommentSchema.validate(
          {
            comment: orderComment,
          },
          { abortEarly: false }
        );

        setIsFormValid(true);
      } catch (errors) {
        if (errors instanceof yup.ValidationError) {
          setIsFormValid(false);
        }
      }
    };

    validateForm();
  }, [
    customerName,
    customerLastName,
    customerEmail,
    customerPhone,
    deliveryCity,
    deliveryAddress,
    deliveryMethod,
    paymentMethod,
    orderComment,
  ]);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const handleSubmit = async () => {
    const customerInfo = {
      name: customerName,
      surname: customerLastName,
      email: customerEmail,
      phoneNumber: customerPhone,
      city: deliveryCity,
      address: deliveryAddress,
      payment: paymentMethod,
      comment: orderComment,
    };

    console.log(customerInfo);

    try {
      await validationPersonalDataSchema.validate(
        {
          name: customerName,
          lastName: customerLastName,
          email: customerEmail,
          phone: customerPhone,
        },
        { abortEarly: false }
      );
      await validationDeliverySchema.validate(
        {
          city: deliveryCity,
          address: deliveryAddress,
          deliveryMethod: deliveryMethod,
        },
        { abortEarly: false }
      );
      await validationPaymentSchema.validate(
        {
          payment: paymentMethod,
        },
        { abortEarly: false }
      );
      await validationCommentSchema.validate(
        {
          comment: orderComment,
        },
        { abortEarly: false }
      );

      console.log(customerInfo);
      dispatch(updateOrderInfo({ id, customerInfo }));
    } catch (errors) {
      if (errors instanceof yup.ValidationError) {
        console.error(errors.errors);
      }
    }
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
              setDeliveryMethod={setDeliveryMethod}
              setDeliveryCity={setDeliveryCity}
              setDeliveryAddress={setDeliveryAddress}
            />
            <Payment setPaymentMethod={setPaymentMethod} />
            <Comment setOrderComment={setOrderComment} />
          </LeftPart>

          <RightPart>
            <BookData selectedDeliveryMethod={deliveryMethod} />
            <OrderData
              customerName={customerName}
              customerLastName={customerLastName}
              customerEmail={customerEmail}
              customerPhone={customerPhone}
              deliveryMethod={deliveryMethod}
              deliveryCity={deliveryCity}
              deliveryAddress={deliveryAddress}
              paymentMethod={paymentMethod}
              orderComment={orderComment}
            />
            <Submit
              onChange={handleCheckboxChange}
              onSubmit={handleSubmit}
              isFormValid={isFormValid}
            />
          </RightPart>
        </FlexWrapper>
      </OrderPageWrapper>
    </StyledCommonWrapper>
  );
};

export default OrderPage;
