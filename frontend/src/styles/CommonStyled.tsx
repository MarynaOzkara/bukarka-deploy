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
  background-color: var(--bukarka-white);

  //todo
  h1 {
    visibility: hidden;
  }
  //todo end  */
`;

// export const InfoPageWrapper = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   text-align: left;

//   background-color: var(--bukarka-white);
// `;

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
