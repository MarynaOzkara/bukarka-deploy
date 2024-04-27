import { StyledList } from "pages/CommonPages.styled";
import styled, { css } from "styled-components";

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

export const Delivery = styled(StyledList)`
  margin-bottom: 32px;
`;

export const Payment = styled(StyledList)`
  margin-bottom: 24px;
`;

export const Return = styled(StyledList)`
  margin-bottom: 16px;

  li {
    width: 700px;
    color: var(--bukarka-deep-blue);
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
