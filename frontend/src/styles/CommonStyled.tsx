import styled from "styled-components";
import { breakpoints } from "constants/breakpoints";
import theme from "./theme";

const { colors, fonts } = theme;

export const StyledCommonWrapper = styled.div`
  padding: 0;
  margin: 0 auto;
  margin-top: 3.5rem;

  @media screen and (min-width: ${breakpoints.tablet}) {
    margin-top: 3.5rem;
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    margin-top: 5.5rem;
  }

  width: 100vw;
`;

export const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100vw;
  max-width: 1296px;
  min-width: ${breakpoints.mobile};
  margin: 0 auto;
  min-height: calc(100vh - 3.5rem);

  background-color: ${colors.background.primary};
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;

  background-color: ${colors.background.primary};
`;

export const Aside = styled.aside`
  position: fixed;
  min-width: 296px;
  padding-left: 32px;
  margin-left: auto;
  overflow-y: auto;
  top: 108px;
  bottom: 0;
  max-height: calc(100vh - 88px);
`;

export const Main = styled.main`
  margin-left: 296px;
  overflow-y: auto;
  margin-top: 104px;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 56px 96px;
`;

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

export const FlexWrap = styled(FlexWrapper)`
  flex-wrap: wrap;
  position: relative;
  width: 100%;
`;

export const TextCenter = styled.div`
  margin: 0.5rem auto;
  text-align: center;
`;

export const Button = styled.button`
  padding: 8px 16px;
  width: 160px;
  border: none;

  color: ${colors.text.primary};

  font-family: "Montserrat-Bold";
  font-weight: 700;
  font-size: 16px;
  //transition: all 0.5s ease;
  &:hover {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }
  &:active {
    color: ${colors.accent.yellow};
  }
`;

export const ButtonOrange = styled(Button)`
  width: 100%;
  background: ${colors.accent.orange};
`;

export const ButtonYellow = styled(Button)`
  width: 100%;
  background: ${colors.accent.yellow};
`;

export const ButtonGreyYellow = styled(Button)`
  color: ${colors.accent.deepBlue};
  border: 2px solid ${colors.accent.yellow};
  margin: 0 0.5rem;
`;

export const ButtonContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Input = styled.input`
  line-height: 2.5rem;
  padding: 0 1rem;
  width: 100%;
  border: none;
  box-shadow: 0px 0px 4px 0px #00000040 inset;

  &::placeholder {
    font-family: ${fonts.regular};
    font-size: 16px;
    line-height: 150%;
    color: ${colors.text.secondary};
  }
`;

export const Hints = styled.ul`
  position: absolute;
  z-index: 100;
  top: calc(100% + 2px);
  left: 0;
  padding: 0.5rem 1rem;
  background-color: ${colors.background.primary};
  width: 100%;
  border: 1px solid ${colors.background.lightGrey};
  border-radius: 5px;
  overflow: auto;
  height: auto;
  max-height: 200px;
  overflow-y: auto;

  & li {
    font-size: 14px;
    margin: 5px 0;

    &.highlighted {
      background: ${colors.accent.deepBlue};
      color: ${colors.text.light};
    }

    &:hover {
      background: ${colors.accent.deepBlue};
      color: ${colors.text.light};
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;

  scroll-behavior: smooth;
`;
