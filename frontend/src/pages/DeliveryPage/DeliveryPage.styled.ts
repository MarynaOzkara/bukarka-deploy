import styled, { css } from "styled-components";

export const DeliveryPageWrapper = styled.div`
  margin-top: 88px;
  padding-top: 32px;
  padding-left: 32px;
  padding-bottom: 104px;

  text-align: left;

  background-color: var(--bukarka-white);
`;

export const DeliveryInfoWrapper = styled.div`
  padding-right: 240px;

  text-align: left;
`;

export const Label = styled.p`
  position: relative;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: fit-content;
  height: 32px;

  margin-bottom: 40px;
  padding: 4px 16px;

  background-color: var(--bukarka-yellow);

  font-family: var(--semibold);
  font-weight: 600;
  font-size: 20px;
  line-height: 1.2;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 8px;
    background: var(--bukarka-deep-blue);
  }
`;
export const AboutDelivery = styled.div`
  margin-left: 208px;
  margin-top: 40px;
`;

const HiddenStyle = css`
  position: absolute;
  white-space: nowrap;
  width: 1px;
  height: 1px;
  overflow: hidden;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  margin: -1px;
`;

export const HiddenTitle = styled.h1`
  ${HiddenStyle}
`;

export const HiddenSubTitle = styled.h3`
  ${HiddenStyle}
`;

export const AccentText = styled.p`
  font-family: var(--semibold);
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.43;

  color: var(--bukarka-orange);
`;

export const SubTitle = styled.h2`
  margin-bottom: 16px;

  font-family: var(--semibold);
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;

  color: var(--bukarka-black);
`;

export const ShiftRight = styled.div`
  padding-left: 16px;
`;

export const SmallSubTitle = styled.h3`
  font-family: var(--semibold);

  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.43;
`;

export const Delivery = styled.ol`
  margin-bottom: 32px;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
  list-style-position: inside;

  li {
    margin-bottom: 20px;
    list-style-type: decimal;
    list-style-position: inside;

    &:last-child {
      margin-bottom: 0;
    }
  }

  h4 {
    display: inline;
    font-family: var(--regular);
    color: var(--bukarka-black);
  }

  p {
    color: var(--bukarka-black);
    padding-left: 0;
  }
`;

export const Payment = styled.ol`
  margin-bottom: 24px;

  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
  list-style-position: inside;

  li {
    margin-bottom: 20px;
    list-style-type: decimal;
    list-style-position: inside;

    &:last-child {
      margin-bottom: 0;
    }
  }

  h4 {
    display: inline;
    font-family: var(--regular);
    color: var(--bukarka-black);
  }

  p {
    color: var(--bukarka-black);
    padding-left: 0;
  }
`;

export const Return = styled.ol`
  margin-bottom: 16px;
  
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
  list-style-position: inside;
  
  li {
    width: 700px;
    margin-bottom: 20px;
    list-style-type: decimal;
    list-style-position: inside;
    color: var(--bukarka-deep-blue);
  }

  h4 {
    display: inline;
    font-family: var(--regular);
  }

  p {
    color: var(--bukarka-black);
    padding-left: 0;
  }
`;

export const Line = styled.hr`
  width: 712px;
  border-bottom: 1px solid var(--bukarka-grey);
  margin-top: 32px;
  margin-bottom: 32px;
`;

export const WarningTitle = styled.p`
  margin-left: 16px;
  margin-bottom: 20px;

  font-family: var(--semibold);
  font-size: 14px;
  line-height: 1.43;
  color: var(--bukarka-deep-blue);
`;

export const WarningText = styled.p`
  margin-left: 16px;
  margin-bottom: 8px;

  font-family: var(--regular);
  font-size: 14px;
  line-height: 1.43;
  color: var(--bukarka-black);
`;

export const Description = styled.p`
  margin-bottom: 16px;

  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
`;

export const ReturnDescription = styled.p`
  margin-bottom: 16px;

  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
`;

export const Wrapper = styled.div`
  width: 100%;
  margin: 96px auto 0;
  padding-left: 96px;
`;
