import { breakpoints } from "constants/breakpoints";
import styled from "styled-components";

// export const FormWrapper = styled.div`
//   width: 100%;
// `;
export const Form = styled.form`
  width: 100%;
  height: fit-content;

  padding: 24px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 8px;

  box-sizing: content-box;
  margin: 0 auto;
  margin-left: -1rem;
  background-color: var(--bukarka-grey);

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
  color: var(--bukarka-black);
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

  border: 1px solid var(--bukarka-grey);
  padding: 8px 112px 8px 16px;
  width: 416px;
  height: 40px;

  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;

  transition: box-shadow 0.3s ease;

  color: var(--bukarka-dark-grey);

  &::placeholder {
    font-family: var(--regular);
    font-size: 16px;
    line-height: 1.5;
    color: var(--bukarka-dark-grey);
  }

  &:hover,
  &:focus {
    box-shadow: inset 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }

  &:focus {
    border: 1px solid var(--bukarka-grey);
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

  font-family: var(--semibold);
  font-size: 16px;
  line-height: 1.5;

  background: var(--bukarka-yellow);
  border: none;

  transition: box-shadow 0.3s ease;

  &:hover,
  &:focus {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }

  &:active {
    color: var(--bukarka-orange);
  }

  @media screen and (min-width: ${breakpoints.tablet}) {
    width: 192px;
  }
`;
