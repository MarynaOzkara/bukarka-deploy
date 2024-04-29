import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 80vh;
  margin-top: 108px;
  padding: 40px 32px;

  background-color: var(--bukarka-white);
`;

export const Thanks = styled.p`
  margin-bottom: 32px;

  font-family: "Montserrat-Medium";
  font-weight: 500;
  font-size: 24px;
  line-height: 1.33;
  color: var(--bukarka-deep-blue);
`;

export const OrderInfo = styled.div`
  width: 824px;
  height: 120px;
  padding: 16px 16px 8px 16px;
  margin-bottom: 32px;
  
  background: var(--bukarka-light-grey-2);
`;

export const Text = styled.p`
  font-family: "Montserrat-Regular";
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: var(--bukarka-black);
`;

export const NumberInfo = styled.p`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const NumberText = styled.p`
  color: var(--bukarka-black);

  font-family: "Montserrat-Medium";
  font-weight: 500;
  font-size: 24px;
  line-height: 1.33;
`;

export const Number = styled.p`
  background: #fff;
  border: 2px solid var(--bukarka-orange);
  color: var(--bukarka-deep-blue);
  padding: 0 32px;

  font-family: "Montserrat-Semibold";
  font-weight: 600;
  font-size: 24px;

  line-height: 1.33;
`;

export const StyledLink = styled(Link)`
  color: var(--bukarka-black);

  font-family: "Montserrat-Medium";
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
`;
