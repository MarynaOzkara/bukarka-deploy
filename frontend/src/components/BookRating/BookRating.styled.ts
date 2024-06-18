import { StarIcon } from "assets/icons";
import styled from "styled-components";

export const StarsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 4px;
  span {
    height: 20px;
  }
`;

export const StyledStarIcon = styled(StarIcon)`
  path {
    fill: ${(props) => props.$fillColor || ""};
  }
`;
