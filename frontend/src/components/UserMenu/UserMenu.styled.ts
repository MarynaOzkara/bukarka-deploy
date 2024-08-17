import styled from "styled-components";
import { breakpoints } from "constants/breakpoints";
import { AvatarIcon, CartIcon, HeartIcon } from "assets/icons";
import theme from "styles/theme";

const { colors } = theme;

export const StyledUserMenu = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const UserMenuItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${breakpoints.desktop}) {
    min-height: 48px;
    width: 112px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 32px;
  height: 32px;
`;

export const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 80px;
  height: 56px;

  color: ${colors.text.primary};
  background-color: transparent;

  font-family: var(--regular);
  font-size: 12px;
  line-height: 133%;
  text-align: center;

  :hover {
    & svg {
      stroke: ${colors.accent.blue};
    }
  }
`;

export const AuthButton = styled(Button)`
  @media (min-width: ${breakpoints.desktop}) {
    width: 112px;
    height: 48px;
  }
`;

export const AuthButtonContentMobile = styled.span`
  @media (min-width: ${breakpoints.desktop}) {
    display: none;
  }
`;

export const AuthButtonContentDesktop = styled.span`
  display: none;
  @media (min-width: ${breakpoints.desktop}) {
    display: inline;
  }
`;

export const CartButton = styled(Button)`
  @media (min-width: ${breakpoints.desktop}) {
    width: 56px;
    height: 48px;
  }
`;

export const FavoriteButton = styled(Button)`
  @media (min-width: ${breakpoints.desktop}) {
    width: 56px;
    height: 48px;
  }
`;

export const StyledHeartIcon = styled(HeartIcon)`
  fill: ${colors.text.primary};
  transition: stroke 0.3s ease;
`;
export const StyledCartIcon = styled(CartIcon)`
  stroke: ${colors.text.primary};
  transition: stroke 0.3s ease;
`;
export const StyledAvatarIcon = styled(AvatarIcon)`
  stroke: ${colors.text.primary};
  transition: stroke 0.3s ease;
`;
