import { LensIcon } from "assets/icons";
import styled from "styled-components";

export const StyledForm = styled.form`
  position: relative;

  display: flex;
  justify-content: center;
  gap: 2px;
`;

export const Input = styled.input`
  padding: 8px 16px 8px 48px;
  width: 400px;
  min-height: 40px;

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

export const Hints = styled.ul`
  position: absolute;
  z-index: 100;
  top: calc(100% + 2px);
  left: 0;
  padding: 0.5rem 1rem;
  background: var(--bukarka-white);
  width: 400px;
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
      background: var(--bukarka-grey);
      color: var(--bukarka-dark-grey);
    }

    &:hover {
      background: var(--bukarka-grey);
      color: var(--bukarka-dark-grey);
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

  /* Custom scrollbar styles for Firefox */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;

  /* Smooth scrolling behavior */
  scroll-behavior: smooth;
`;
