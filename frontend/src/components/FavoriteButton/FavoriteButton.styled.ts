import React from "react";
import styled from "styled-components";

interface StyledHeartProps extends React.HTMLAttributes<HTMLDivElement> {
  $isFavorite: boolean;
  onClick: () => void;
}

export const StyledHeart = styled.div<StyledHeartProps>`
  svg path:hover {
    stroke: #3d7efd;
    cursor: pointer;
  }

  svg path {
    fill: ${(props) => (props.$isFavorite ? "#3D7EFD" : "#FFFBFF")};
  }
`;
