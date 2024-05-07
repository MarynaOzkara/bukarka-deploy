import { Link } from "react-router-dom";
import {
  Copyright,
  ListItem,
  LogoBlock,
  StyledContacts,
  StyledFooter,
  StyledList,
  StyledLogo,
  StyledNav,
  Wrapper,
} from "./Footer.styled";
import { StyledCommonWrapper } from "styles/CommonStyled";

const Footer: React.FC = () => {
  return (
    <StyledCommonWrapper>
      <StyledFooter>
        <Wrapper>
          <LogoBlock>
            <Link to="/">
              <StyledLogo />
            </Link>
          </LogoBlock>
          <StyledNav>
            <StyledList>
              <ListItem>
                <Link to="/about">Про магазин</Link>
              </ListItem>
              <ListItem>
                <Link to="/delivery">Доставка, оплата і повернення</Link>
              </ListItem>
              <ListItem>
                <Link to="/contacts">Контакти і зворотний зв’язок</Link>
              </ListItem>
            </StyledList>
            <StyledList>
              <ListItem>
                <Link to="/club">Book Club</Link>
              </ListItem>
              <ListItem>
                <Link to="/privacy">Політика конфіденційності</Link>
              </ListItem>
              <ListItem>
                <Link to="/terms">Умови користування</Link>
              </ListItem>
            </StyledList>
          </StyledNav>
          <StyledContacts />
        </Wrapper>

        <Copyright>Copyright © Bukarka 2024</Copyright>
      </StyledFooter>
    </StyledCommonWrapper>
  );
};

export default Footer;
