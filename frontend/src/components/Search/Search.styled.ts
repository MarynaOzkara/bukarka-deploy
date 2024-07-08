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
  padding: 0 16px 0 48px;
  width: 240px;

  border: none;
  box-shadow: 0px 0px 4px 0px #00000040 inset;

  &:focus-visible {
    outline-color: var(--bukarka-grey);
  }

  &::placeholder {
    font-family: var(--regular);
    font-size: 16px;
    line-height: 150%;
    color: var(--bukarka-dark-grey);
  }

  @media (min-width: 1024px) {
    width: 400px;
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

export const StyledHints = styled(Hints)`
  width: 400px;
`;
