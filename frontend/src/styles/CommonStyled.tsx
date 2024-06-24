import styled from "styled-components";

export const StyledCommonWrapper = styled.div`
  /* max-width: 375px;
  padding-left: 20px;
  padding-right: 20px; */
  margin: 0 auto;
  max-width: 1296px;

  /* @media screen and (min-width: 768px) {
    max-width: 768px;
    padding-left: 32px;
    padding-right: 32px;
  } */

  @media screen and (min-width: 1440px) {
    max-width: 1296px;
    //  padding-left: 72px;
    //  padding-right: 72px;
  }
  /* outline: 1px solid green; */
`;

export const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;

  margin-top: 88px;
  padding-bottom: 80px;
  background-color: var(--bukarka-white);
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
  margin: 0 auto;
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

  &:focus-visible {
    outline-color: var(--bukarka-grey);
  }

  &::placeholder {
    font-family: var(--regular);
    font-size: 16px;
    line-height: 150%;
    color: var(--bukarka-dark-grey);
  }
`;
