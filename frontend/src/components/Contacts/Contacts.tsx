import { ContactList, ListItem, StyledIcon } from "./Contacts.styled";
import SocialList from "components/SocialList/SocialList";

const Contacts: React.FC = () => {
  return (
    <ContactList>
      <ListItem>
        <StyledIcon name="icon-phone" />
        <span>+380 96 123 45 67</span>
      </ListItem>
      <ListItem>
        <StyledIcon name="icon-mail" />
        <span>bukarka.info@gmail.com</span>
      </ListItem>

      <ListItem>
        <SocialList />
      </ListItem>
    </ContactList>
  );
};

export default Contacts;
