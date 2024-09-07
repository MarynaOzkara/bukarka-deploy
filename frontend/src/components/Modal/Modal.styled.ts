import styled, { keyframes, css } from "styled-components";
import theme from "styles/theme";
import { breakpoints } from "constants/breakpoints";

const { colors } = theme;

interface ModalContentProps {
  $animation?: string; // Use $ prefix for automatic filtering
}

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 5;
  overflow: auto;
`;

export const ModalContent = styled.div<ModalContentProps>`
  position: relative;
  max-height: content-fit;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  background: ${colors.background.primary};
  max-height: 90vh;

  ${({ $animation }) =>
    $animation === "fade" &&
    css`
      animation: ${fadeIn} 0.3s ease forwards;
    `}

  ${({ $animation }) =>
    $animation === "slide" &&
    css`
      animation: ${slideIn} 0.3s ease forwards;
    `}
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 8px;
  z-index: 1;
  padding: 0;

  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;

  @media screen and (min-width: ${breakpoints.desktop}) {
    display: block;
    right: 16px;
  }
`;
