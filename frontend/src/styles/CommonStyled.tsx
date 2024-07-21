import { breakpoints } from "constants/breakpoints";
import styled from "styled-components";

export const StyledCommonWrapper = styled.div`
  padding: 0;
  margin: 0 auto;
  margin-top: 3.5rem;

  width: 100vw;

  @media screen and (min-width: ${breakpoints.desktop}) {
    margin: 0 auto;
    margin-top: 88px;
  }
`;

export const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100vw;
  max-width: 1296px;
  margin: 0 auto;
  min-width: ${breakpoints.mobile};

  background-color: var(--bukarka-white);

  @media screen and (min-width: ${breakpoints.desktop}) {
    margin-top: 88px;
    padding-bottom: 80px;
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    margin-top: 88px;
    padding-bottom: 80px;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;

  background-color: var(--bukarka-white);
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
  /* flex-grow: 1; */
  margin-top: 104px;
  //background-color: white;
  /* min-height: calc(75vh); */
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

  color: var(--bukarka-black);

  font-family: "Montserrat-Bold";
  font-weight: 700;
  font-size: 16px;
  //transition: all 0.5s ease;
  &:hover {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }
  &:active {
    color: var(--bukarka-yellow);
  }
`;

export const ButtonOrange = styled(Button)`
  width: 100%;
  background: var(--bukarka-orange);
`;

export const ButtonYellow = styled(Button)`
  width: 100%;
  background: var(--bukarka-yellow);
`;

export const ButtonGreyYellow = styled(Button)`
  color: var(--bukarka-deep-blue);
  border: 2px solid var(--bukarka-yellow);
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
    font-family: var(--regular);
    font-size: 16px;
    line-height: 150%;
    color: var(--bukarka-dark-grey);
  }
`;

export const Hints = styled.ul`
  position: absolute;
  z-index: 100;
  top: calc(100% + 2px);
  left: 0;
  padding: 0.5rem 1rem;
  background: var(--bukarka-white);
  width: 100%;
  border: 1px solid var(--bukarka-light-grey);
  border-radius: 5px;
  overflow: auto;
  height: auto;
  max-height: 200px;
  overflow-y: auto;

  & li {
    font-size: 14px;
    margin: 5px 0;

    &.highlighted {
      background: var(--bukarka-deep-blue);
      color: var(--bukarka-white);
    }

    &:hover {
      background: var(--bukarka-deep-blue);
      color: var(--bukarka-white);
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
