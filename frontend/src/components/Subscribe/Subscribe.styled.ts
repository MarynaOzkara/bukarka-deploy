import styled from "styled-components";
import { breakpoints } from "constants/breakpoints";
import theme from "styles/theme";

const { colors, fonts } = theme;

export const Form = styled.form`
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 8px;
  padding: 1rem;

  box-sizing: content-box;
  margin: 0 auto;

  background-color: ${colors.background.grey};

  @media screen and (min-width: ${breakpoints.tablet}) {
    white-space: wrap;
    gap: 16px;
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    width: 672px;
    padding: 32px 48px;
    margin: 0 auto;
    gap: 24px;
  }
`;

export const Title = styled.label`
  font-weight: 400;
  font-size: 24px;

  line-height: 1.33;
  color: ${colors.text.primary};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: ${breakpoints.tablet}) {
    width: 100%;
    flex-wrap: wrap;
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    width: 100%;
    flex-wrap: nowrap;
  }
`;

export const Input = styled.input`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  border: 1px solid ${colors.border.primary};
  padding: 8px 112px 8px 16px;
  width: 416px;
  height: 40px;

  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;

  transition: box-shadow 0.3s ease;

  color: ${colors.text.secondary};

  &::placeholder {
    font-family: ${fonts.regular};
    font-size: 16px;
    line-height: 1.5;
    color: ${colors.text.secondary};
  }

  &:hover,
  &:focus {
    box-shadow: inset 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }

  &:focus {
    border: 1px solid ${colors.border.primary};
  }
`;

export const Button = styled.button`
  padding: 8px 16px;
  width: 416px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 0px;

  font-family: ${fonts.semibold};
  font-size: 16px;
  line-height: 1.5;

  background: ${colors.accent.yellow};
  border: none;

  transition: box-shadow 0.3s ease;

  &:hover,
  &:focus {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }

  &:active {
    color: ${colors.accent.orange};
  }

  @media screen and (min-width: ${breakpoints.tablet}) {
    width: 192px;
  }
`;
