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

  & li {
    font-size: 14px;
    margin: 5px 0;
  }
`;
