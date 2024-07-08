import { LensIcon } from "assets/icons";
import styled from "styled-components";
import { Hints, Input } from "styles/CommonStyled";

export const StyledForm = styled.form`
  position: relative;

  display: flex;
  justify-content: center;
  gap: 2px;
`;

export const SearchInput = styled(Input)`
  height: 40px;
  width: 200px;
  padding: 0 8px;

  border: none;

  &::placeholder {
    font-family: var(--regular);
    font-size: 16px;
    line-height: 150%;
    color: var(--bukarka-dark-grey);
  }

  @media (min-width: 768px) {
    width: 400px;
    padding: 0 16px 0 48px;
  }
`;

export const StyledLensIcon = styled(LensIcon)`
  display: none;

  @media (min-width: 768px) {
    display: inline-block;

    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 16px;

    stroke: var(--bukarka-grey);
  }
`;

export const FormButton = styled.button`
  border: none;
  background: var(--bukarka-orange);
  color: var(--bukarka-black);
`;

export const FormButtonMobile = styled(FormButton)`
  padding: 2px 4px;

  & svg {
    stroke: var(--bukarka-black);
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export const FormButtonDesktop = styled(FormButton)`
  display: none;

  @media (min-width: 768px) {
    display: inline-block;
    padding: 8px 21px;

    font-family: var(--semibold);
    font-size: 16px;
    line-height: 150%;
  }
`;

export const StyledHints = styled(Hints)`
  width: 400px;
`;
