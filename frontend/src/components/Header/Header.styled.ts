import { LensIcon, Logo } from "assets/icons";
import styled from "styled-components";

export const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  padding: 8px 0;

  background-color: var(--bukarka-light-grey);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);

  z-index: 1;
`;

export const Wrapper = styled.div`
  max-width: 1296px;
  padding-left: 32px;
  padding-right: 32px;
  margin: 0 auto;

  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  gap: 32px;
`;

export const StyledLogo = styled(Logo)`
  min-width: 120px;
  min-height: 71px;
`;


export const CatalogButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  width: 144px;
  padding: 0 16px 0 8px;

  background-color: var(--bukarka-yellow);

  font-family: var(--semibold);
  font-size: 16px;
  color: var(--bukarka-black);
`;

export const ButtonWrapper = styled.div``;

export const StyledForm = styled.form`
  position: relative;

  display: flex;
  justify-content: center;
  gap: 1px;
`;

export const Input = styled.input`
  padding: 8px 16px 8px 48px;
  width: 400px;
  min-height: 40px;

  border: none;

  &::placeholder {
    font-family: var(--regular);
    font-size: 16px;
    line-height: 150%;
    color: var(--bukarka-dark-grey);
  }
`;

export const StyledLensIcon = styled(LensIcon)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 16px;
`;

export const FormButton = styled.button`
  padding: 8px 21px;
  border: none;

  background: var(--bukarka-orange);
  color: var(--bukarka-black);

  font-family: var(--semibold);
  font-size: 16px;
  line-height: 150%;
  color: var(--bukarka-black);
`;
