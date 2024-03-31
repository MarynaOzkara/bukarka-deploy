import styled from "styled-components";
import { Wrapper } from "../OrderCommonStyled";

export const BookDataWrapper = styled(Wrapper)`
  width: 400px;
  min-height: 480px;
`;

export const Book = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--bukarka-light-grey-1);
`;

export const ImageWrapper = styled.div`
  width: 88px;
  height: 120px;
  background-color: lightblue;
`;

export const Title = styled.h3`
  height: 60px;
  margin-bottom: 16px;
  color: var(--bukarka-black);

  font-family: "Montserrat-Semibold";
  font-weight: 600;
  font-size: 14px;
  line-height: 1.43;
`;

export const Author = styled.h4`
  color: var(--bukarka-black);

  font-family: "Montserrat-Regular";
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
`;

export const PriceQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 96px;
`;

export const Price = styled.p`
  color: var(--bukarka-blue);

  font-family: "Montserrat-Semibold";
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  text-align: left;
`;

export const Quantity = styled.p``;

export const Delivery = styled.p`
  display: flex;
  gap: 16px;
  padding: 16px 0;

  color: var(--bukarka-black);

  font-family: "Montserrat-Medium";
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
  border-bottom: 1px solid var(--bukarka-black);
`;

export const DeliveryTitle = styled.span`
  min-width: 88px;
`;

export const DeliveryPrice = styled.span`
  color: var(--bukarka-orange);
`;

export const Total = styled.p`
  display: flex;
  padding: 16px 0;

  color: var(--bukarka-black);

  font-family: "Montserrat-Semibold";
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
`;

export const TotalTitle = styled.span`
  min-width: 88px;
`;

export const PriceWithDelivery = styled.span`
  color: var(--bukarka-orange);
`;
