import styled from "styled-components";

export const Wrapper = styled.div`
  margin-bottom: 16px;
`;

export const CartHeader = styled.div`
  display: flex;
  gap: 584px;

  margin-bottom: 24px;
`;

export const AmountOfBooks = styled.div`
  color: var(--bukarka-black);

  font-family: var(--semibold);
  font-size: 16px;
  line-height: 150%;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  color: var(--bukarka-dark-grey);

  font-family: var(--regular);
  font-size: 12px;
  line-height: 133%;
  text-align: center;
`;

export const ListWrapper = styled.div`
  margin-bottom: 16px;
`;

export const PriceBlock = styled.div`
  margin-bottom: 48px;
`;

export const PriceText = styled.span`
  display: inline-flex;
  align-items: center;
  height: 24px;
  width: 96px;
  margin-right: 16px;
  padding-left: 8px;

  background: var(--bukarka-yellow);
  border-left: 8px solid var(--bukarka-orange);
  color: var(--bukarka-black);

  font-family: var(--semibold);
  font-size: 16px;
  line-height: 150%;
`;

export const TotalPrice = styled.span`
  font-family: var(--semibold);
  font-size: 24px;
  line-height: 133%;
  color: var(--bukarka-orange);
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

export const ContinueButton = styled.button`
  flex-grow: 1;

  padding: 8px 16px;
  height: 40px;

  background: var(--bukarka-yellow);
  color: var(--bukarka-black);

  font-family: var(--semibold);
  font-size: 16px;
  line-height: 150%;

  &:hover {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }

  &:active {
    color: var(--bukarka-orange);
  }
`;

export const CheckoutButton = styled.button`
  flex-grow: 1;

  padding: 8px 16px;
  height: 40px;

  background: var(--bukarka-orange);
  color: var(--bukarka-black);

  font-family: var(--bold);
  font-size: 16px;
  line-height: 150%;

  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }

  &:active {
    color: var(--bukarka-yellow);
  }
`;
