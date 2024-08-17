import styled from "styled-components";
import theme from "styles/theme";

const { colors } = theme;

export const PaymentPageWrapper = styled.div`
  margin-top: 88px;
  padding: 40px 32px 96px;
  background-color: ${colors.background.primary};
`;

export const Title = styled.h1`
  margin-bottom: 32px;

  font-family: var(--semibold);
  font-weight: 600;
  font-size: 24px;
  line-height: 1.33;
  color: ${colors.text.primary};
  letter-spacing: 0em;
`;

export const CardWrapper = styled.div`
  display: flex;
  gap: 16px;

  margin-bottom: 32px;
`;

export const Card = styled.div`
  padding: 24px 48px 32px;
  background: ${colors.background.lightGrey};
`;

export const Info = styled.div`
  background: ${colors.background.lightGrey};
  padding: 24px 48px 32px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SubTitle = styled.h2`
  position: relative;
  left: -48px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 280px;
  height: 24px;
  margin-bottom: 32px;

  padding: 0 12px 0 16px;

  background-color: ${colors.accent.yellow};

  font-family: var(--bold);
  font-weight: 700;
  font-size: 16px;

  line-height: 1.5;
  color: ${colors.text.primary};

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 8px;
    background: ${colors.accent.orange};
  }
`;

export const SubTitleBlue = styled(SubTitle)`
  &::before {
    background-color: ${colors.accent.deepBlue};
  }
`;

export const CardData = styled.div`
  display: flex;
  /* justify-content: space-between; */
  gap: 88px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;

  font-family: "Montserrat-Semibold";
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.text.primary};
`;

export const DateLabel = styled.label`
  display: block;

  & span {
    display: inline-block;

    margin-bottom: 8px;
    font-family: "Montserrat-Semibold";
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    color: ${colors.text.primary};
  }
`;

export const NumberInput = styled.input`
  margin-bottom: 24px;
  padding: 8px 16px;
  width: 100%;
  height: 40px;

  border: 1px solid ${colors.border.primary};
`;

export const DateInput = styled.input`
  width: 48px;
  height: 40px;

  border: 1px solid ${colors.border.primary};

  text-align: center;

  &::placeholder {
    text-align: center;
  }
`;

export const CVVInput = styled.input`
  display: block;
  border: 1px solid ${colors.border.primary};
  width: 88px;
  height: 40px;
  text-align: center;
`;

export const OrderNumber = styled.p`
  margin-bottom: 8px;

  font-family: "Montserrat-Semibold";
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.text.primary};
`;

export const Bukarka = styled.p`
  margin-bottom: 8px;
  font-family: "Montserrat-Regular";
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.text.primary};
`;

export const Books = styled.p`
  display: flex;
  justify-content: space-between;

  margin-bottom: 8px;
  font-family: "Montserrat-Regular";
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.text.primary};
`;

export const Delivery = styled.p`
  display: flex;
  justify-content: space-between;

  margin-bottom: 8px;
  font-family: "Montserrat-Regular";
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.text.primary};
`;

interface DeliveryPriceProps {
  deliveryPrice: number | null;
}

export const DeliveryPrice = styled.span<DeliveryPriceProps>`
  font-family: "Montserrat-Medium";
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;

  color: ${(props) =>
    props.deliveryPrice ? colors.text.primary : colors.accent.orange};
`;

export const Line = styled.div`
  margin-bottom: 8px;
  border-bottom: 1px solid ${colors.text.primary};
`;

export const ToPay = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  font-family: "Montserrat-Semibold";
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.text.primary};
`;

export const Total = styled.span`
  color: ${colors.text.primary};

  font-family: "Montserrat-Semibold";
  font-weight: 600;
  font-size: 24px;
  line-height: 1.33;
`;

export const Payment = styled.div``;

export const ReceiptLabel = styled.label`
  display: block;
  margin-bottom: 8px;

  font-family: "Montserrat-Regular";
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.accent.deepBlue};
`;

export const ReceiptInput = styled.input`
  width: 400px;
  height: 24px;
  margin-bottom: 24px;
  border: none;
  border-bottom: 1px solid ${colors.border.secondary};

  font-family: "Montserrat-Regular";
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.text.secondary};

  &:last-child {
    margin-bottom: 32px;
  }
`;

interface SubmitButtonProps {
  orderNumber: string | null;
}

export const SubmitButton = styled.button<SubmitButtonProps>`
  width: 400px;
  height: 40px;
  padding: 8px 16px;

  background: ${colors.accent.orange};
  color: ${colors.text.primary};

  font-family: "Montserrat-Bold";
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }

  &:disabled {
    background: ${colors.background.grey};
    border-color: ${colors.border.primary};
  }
`;
