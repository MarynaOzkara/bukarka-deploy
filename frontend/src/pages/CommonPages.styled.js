import styled from "styled-components";
import { breakpoints } from "./../constants/breakpoints";
import theme from "styles/theme";
import { FlexWrap } from "styles/CommonStyled";

const { colors } = theme;

export const Label = styled.p`
  position: relative;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: fit-content;
  margin-bottom: 40px;
  height: 32px;

  padding: 4px 16px;

  background-color: ${colors.accent.yellow};

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
    background: ${colors.accent.deepBlue};
  }

  @media screen and (min-width: ${breakpoints.mobile}) {
    margin-left: -1rem;
  }

  @media screen and (min-width: ${breakpoints.tablet}) {
    margin: 0;
    margin-bottom: 40px;
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
  }
`;

export const GridPageWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 336px 1fr;
  margin-top: 88px;
  padding-top: 32px;
  padding-bottom: 104px;

  text-align: left;

  background-color: ${colors.background.primary};
`;

export const LeftPart = styled.div`
  width: 396px;
  padding-left: 32px;
`;

export const RightPart = styled.div`
  padding: 40px 120px 96px 110px;
`;

export const InfoPageWrapper = styled.div`
  margin-top: 88px;
  padding-top: 32px;
  padding-left: 32px;
  padding-bottom: 104px;

  background-color: ${colors.background.primary};
`;

export const InfoWrapper = styled.div`
  padding-right: 240px;
  margin-left: 208px;
  margin-top: 40px;
`;

export const Image = styled.img`
  width: 336px;
  height: 459px;
`;

export const SubscribeWrapperGrid = styled.div`
  width: 672px;
  grid-column: span 2;
  justify-self: center;
`;

export const TextAccent = styled.p`
  font-family: var(--regular);
  font-size: 14px;
  line-height: 1.43;
  color: ${colors.accent.deepBlue};
`;

export const StyledList = styled.ol`
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

  h2 {
    display: inline-block;

    margin-bottom: 16px;

    font-family: var(--semibold);
    font-size: 14px;
    line-height: 1.43;
    color: ${colors.text.primary};
  }

  h4 {
    display: inline;
    font-family: var(--regular);
    color: ${colors.text.primary};
  }

  span {
    display: inline;
    font-family: var(--regular);
    color: ${colors.accent.deepBlue};
  }

  p {
    color: ${colors.text.primary};
    padding-left: 0;
  }
`;

export const Title = styled.h1`
  margin-bottom: 16px;

  font-family: var(--semibold);
  font-weight: 600;
  font-size: 20px;
  line-height: 1.2;
  text-align: center;
  color: ${colors.text.primary};
`;

export const SubscribeWrapper = styled.div`
  margin: 96px auto 0;
  padding-right: 32px;
`;

export const BreadCrumbs = styled.h6`
  text-align: left;
  color: ${colors.text.secondary};
  margin: 1rem 0;
  & * {
    color: ${colors.text.secondary};
  }
`;

export const Price = styled.div`
  font-family: "Montserrat-Bold";
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: ${colors.accent.blue};
  margin-bottom: 8px;
  & span {
    font-size: 16px;
    text-decoration: line-through;
    color: ${colors.text.secondary};
  }
`;

export const Separator = styled.div`
  margin: 1rem 0;
  border: 1px solid ${colors.background.lightGrey};
`;

export const StyledFlexWrap = styled(FlexWrap)`
  position: relative;
  gap: 1.5rem;
  justify-content: space-around;
`;
