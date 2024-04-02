import styled from "styled-components";

export const PaymentPageWrapper = styled.div`
  margin-top: 108px;
  padding: 40px 32px 96px;
  background-color: var(--bukarka-white);
`;

export const Title = styled.h1`
  margin-bottom: 32px;

  font-family: var(--semibold);
  font-weight: 600;
  font-size: 24px;
  line-height: 1.33;
  color: var(--bukarka-black);
  letter-spacing: 0em;
`;

export const CardWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const Card = styled.div`
  padding: 24px 48px 32px;
  background: var(--bukarka-light-grey-2);
`;

export const Info = styled.div`
  background: var(--bukarka-light-grey-2);
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

  background-color: var(--bukarka-yellow);

  font-family: var(--bold);
  font-weight: 700;
  font-size: 16px;

  line-height: 1.5;
  color: var(--bukarka-black);

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 8px;
    background: var(--bukarka-orange);
  }
`;

export const SubTitleBlue = styled(SubTitle)`
  &::before {
    background-color: var(--bukarka-blue);
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
  color: var(--bukarka-black);
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
    color: var(--bukarka-black);
  }
`;

export const NumberInput = styled.input`
  margin-bottom: 24px;
  padding: 8px 16px;
  width: 100%;
  height: 40px;

  border: 1px solid var(--bukarka-light-grey-1);
`;

export const DateInput = styled.input`
  width: 48px;
  height: 40px;

  border: 1px solid var(--bukarka-light-grey-1);

  text-align: center;

  &::placeholder {
    text-align: center;
  }
`;

export const CVVInput = styled.input`
  display: block;
  border: 1px solid var(--bukarka-light-grey-1);
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
  color: var(--bukarka-black);
`;

export const Bukarka = styled.p`
  margin-bottom: 8px;
  font-family: "Montserrat-Regular";
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: var(--bukarka-black);
`;

export const Books = styled.p`
  margin-bottom: 8px;
  font-family: "Montserrat-Regular";
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: var(--bukarka-black);
`;

export const Delivery = styled.p`
  margin-bottom: 8px;
  font-family: "Montserrat-Regular";
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: var(--bukarka-black);
`;

export const ToPay = styled.p`
  font-family: "Montserrat-Semibold";
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  color: var(--bukarka-black);
`;

export const Payment = styled.div``;
