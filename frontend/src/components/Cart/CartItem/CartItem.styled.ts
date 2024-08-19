import styled from "styled-components";
import theme from "styles/theme";

const { colors, fonts } = theme;

export const StyledCartItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 16px;
  height: 136px;
  border-bottom: 1px solid ${colors.border.primary};
`;

export const BookInfo = styled.div`
  display: flex;
  gap: 16px;
`;

export const ImageWrapper = styled.div`
  width: 88px;
  height: 120px;

  img {
    height: 100%;
    width: auto;
    margin: 0 auto;
  }
`;

export const Description = styled.div`
  width: 400px;
`;

export const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;

  color: ${colors.text.primary};

  font-family: "Montserrat-Semibold";
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0;
`;

export const Author = styled.h4`
  margin-bottom: 24px;

  color: ${colors.text.primary};

  font-family: "Montserrat-Regular";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;
  text-transform: none;
`;

export const FavoriteButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PriceBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  width: 296px;

  font-family: "Montserrat-Semibold";
  font-weight: 600;
`;

export const ItemPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;

  font-size: 30px;
  height: 32px;
`;

export const Price = styled.p`
  font-family: ${fonts.regular};
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: ${colors.accent.deepBlue};
`;

export const Quantity = styled.div`
  display: flex;
  width: 88px;
  height: 32px;

  font-family: "Montserrat-Semibold";
  font-weight: 600;
  border-top: 1px solid #dad3cd;
  border-bottom: 1px solid #dad3cd;

  input {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 40px;

    background-color: ${colors.background.secondary};
    border: none;

    font-family: "Montserrat-Semibold";
    font-weight: 600;
    text-align: center;
  }
`;

export const ChangeButton = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  max-width: 24px;
  width: 100%;
  padding: 8px;

  background-color: ${colors.accent.yellow};

  font-family: "Montserrat-Semibold";
  font-weight: 600;
  border-left: 1px solid #dad3cd;
  border-right: 1px solid #dad3cd;

  cursor: pointer;
`;

export const TotalPrice = styled.p`
  font-family:  ${fonts.bold};
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: ${colors.accent.deepBlue};
`;

export const ButtonWrapper = styled.div``;

export const DeleteButton = styled.button`
  display: block;
  margin: 0 auto;
  margin-top: 16px;

  background-color: transparent;
  color: #7c7165;

  font-family: "Montserrat-Regular";
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`;
