import styled from "styled-components";

export const BookContentWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;

export const StyledBookImage = styled.section`
  width: 296px;
  flex-shrink: 0;
`;

export const StyledButtonContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 296px;
  flex-shrink: 0;
`;
export const StyledBookDescription = styled.section`
  flex-grow: 1;
  text-align: left;
`;
export const Separator = styled.div`
  margin: 1rem 0;
  border: 1px solid var(--bukarka-light-grey);
`;
export const DescTable = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(24px, auto);
  gap: 8px;

  & li {
    display: contents;
  }

  & li span:nth-child(1) {
    grid-column: 1;
    font-weight: bold;
  }

  & li span:nth-child(2) {
    grid-column: 2;
  }
`;

export const BookTitle = styled.h2`
  line-height: 2.5rem;
  font-size: 2rem;
`;
export const BookSubTitle = styled.h3`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 500;
  color: var(--bukarka-dark-grey);
`;

export const Description = styled.div`
  & b {
    line-height: 2rem;
    font-weight: 700;
  }

  p {
    line-height: 24px;
  }
`;
