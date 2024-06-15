import styled from "styled-components";

export const Options = styled.select`
  font-family: inherit;
  color: var(--bukarka-dark-grey);
  background: var(--bukarka-white);
  position: absolute;
  right: 0;
  top: -2.5rem;
  padding: 0.25rem 0;
  border: none;
  width: fit-content;

  &:focus-visible {
    outline: none;
  }

  & option {
    background: var(--bukarka-white);

    &:selected {
      background: var(--bukarka-deep-blue);
      color: var(--bukarka-white);
    }

    &:hover {
      background: var(--bukarka-deep-blue);
      color: var(--bukarka-white);
    }
    &.section {
      font-weight: 600;
    }
  }
`;
