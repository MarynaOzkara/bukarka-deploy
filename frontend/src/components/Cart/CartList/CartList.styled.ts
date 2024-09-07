import styled from "styled-components";
import theme from "styles/theme";

const { colors, fonts } = theme;

export const Wrapper = styled.div`
  margin-bottom: 16px;
`;

export const CartHeader = styled.div`
  display: flex;
  gap: 584px;

  margin-bottom: 24px;
`;

export const AmountOfBooks = styled.div`
  color: ${colors.text.primary};

  font-family: ${fonts.semibold};
  font-size: 16px;
  line-height: 150%;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  color: ${colors.text.secondary};

  font-family: ${fonts.regular};
  font-size: 12px;
  line-height: 133%;
  text-align: center;
`;

export const ListWrapper = styled.div`
  max-height: 456px;
  margin-bottom: 16px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    width: 8px;
    height: 48px;
    border: 1px solid ${colors.border.secondary};
    border-radius: 4px;
    background: ${colors.border.primary};
  }

  &::-webkit-scrollbar-track {
    border-radius: 4px;
    width: 8px;
    box-shadow: inset 0 1px 4px 0 rgba(0, 0, 0, 0.25);
    background: ${colors.background.lightGrey};
  }
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

  background: ${colors.accent.yellow};
  border-left: 8px solid ${colors.accent.orange};
  color: ${colors.text.primary};

  font-family: ${fonts.semibold};
  font-size: 16px;
  line-height: 150%;
`;

export const TotalPrice = styled.span`
  font-family: ${fonts.semibold};
  font-size: 24px;
  line-height: 133%;
  color: ${colors.accent.orange};
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

  background: ${colors.accent.yellow};
  font-family: ${fonts.semibold};
  font-size: 16px;
  line-height: 150%;

  & a {
    color: ${colors.text.primary};
  }

  &:active {
    color: ${colors.accent.orange};
  }

  &:hover {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }
`;

export const CheckoutButton = styled.button`
  flex-grow: 1;

  padding: 8px 16px;
  height: 40px;

  background: ${colors.accent.orange};
  font-family: ${fonts.bold};
  font-size: 16px;
  line-height: 150%;

  transition: all 0.3s ease;

  & a {
    color: ${colors.text.primary};
  }

  &:active {
    color: ${colors.accent.yellow};
  }

  &:hover {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }
`;
