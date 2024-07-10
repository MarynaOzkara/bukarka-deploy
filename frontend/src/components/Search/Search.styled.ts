import styled from "styled-components";
import { LensIcon } from "assets/icons";
import { breakpoints } from "constants/breakpoints";
import { Hints, Input } from "styles/CommonStyled";

export const StyledForm = styled.form`
  position: relative;

  display: flex;
  justify-content: center;
  gap: 2px;
`;

export const SearchInput = styled(Input)`
  height: 40px;
  width: 70%;
  padding: 0 8px;

  border: none;

  &::placeholder {
    font-family: var(--regular);
    font-size: 16px;
    line-height: 150%;
    color: var(--bukarka-dark-grey);
  }

  @media (min-width: ${breakpoints.mobile}) {
    width: 200px;
  }

  @media (min-width: 768px) {
    width: 300px;
  }
  @media (min-width: ${breakpoints.desktop}) {
    width: 400px;
    padding: 0 16px 0 48px;
  }
`;

export const StyledLensIcon = styled(LensIcon)`
  display: none;

  @media (min-width: ${breakpoints.desktop}) {
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

  transition: box-shadow 0.3s ease, color 0.3s ease;

  &:hover {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }

  &:active {
    color: var(--bukarka-yellow);
  }
`;

export const FormButtonMobile = styled(FormButton)`
  padding: 2px 4px;

  & svg {
    stroke: var(--bukarka-black);
  }

  @media (min-width: ${breakpoints.desktop}) {
    display: none;
  }
`;

export const FormButtonDesktop = styled(FormButton)`
  display: none;

  @media (min-width: ${breakpoints.desktop}) {
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
