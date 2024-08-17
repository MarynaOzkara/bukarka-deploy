import styled from "styled-components";
import { LensIcon } from "assets/icons";
import { breakpoints } from "constants/breakpoints";
import theme from "styles/theme";
import { Hints, Input } from "styles/CommonStyled";

const { colors } = theme;

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
  box-shadow: 0px 0px 4px 0px #00000040 inset;

  &.error {
    color: red;
  }

  &::placeholder {
    font-family: var(--regular);
    font-size: 16px;
    line-height: 150%;
    color: ${colors.text.secondary};
  }

  @media (min-width: ${breakpoints.mobile}) {
    width: 200px;
  }

  @media (min-width: ${breakpoints.tablet}) {
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

    stroke: ${colors.border.primary};
  }
`;

export const FormButton = styled.button`
  border: none;
  background: ${colors.accent.orange};
  color: ${colors.text.primary};

  transition: box-shadow 0.3s ease, color 0.3s ease;

  &:hover {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }

  &:active {
    color: ${colors.accent.yellow};
  }
`;

export const FormButtonMobile = styled(FormButton)`
  padding: 2px 4px;

  & svg {
    stroke: ${colors.text.primary};
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
  max-width: 400px;
`;
