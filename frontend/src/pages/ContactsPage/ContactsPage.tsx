import { StyledCommonWrapper } from "styles/CommonStyled";
import {
  Button,
  Checkbox,
  CheckboxLabel,
  CheckboxWrapper,
  ContactsPageWrapper,
  Form,
  FormWrapper,
  Hint,
  Input,
  InputLabel,
  Label,
  Schedule,
  ScheduleText,
  Text,
  TextArea,
  TextLast,
  Title,
  Top,
  // Wrapper,
} from "./ContactsPage.styled";
import Contacts from "components/Contacts";
import Subscribe from "components/Subscribe";

const ContactsPage: React.FC = () => {
  return (
    <StyledCommonWrapper>
      <ContactsPageWrapper>
        <Label>Контакти і зворотний зв’язок</Label>
        <Top>
          <div>
            <Title>Онлайн книгарня “Букарка”</Title>
            <Text>Вітаємо у нашому онлайн книжковому магазині! </Text>
            <TextLast>
              Ми завжди раді допомогти вам з вибором книг та відповісти на
              питання. Ви можете зв’язатися з нами за телефоном, електронною
              поштою, у месенджерах або за допомогою форми зворотного зв’язку
              нижче.
            </TextLast>
          </div>
          <div>
            <ScheduleText>Графік роботи: </ScheduleText>
            <Schedule>Пн - Нд з 9:00 до 20:00</Schedule>
            <Contacts />
          </div>
        </Top>
        <FormWrapper>
          <Form>
            <InputLabel>Електронна пошта*</InputLabel>
            <Input placeholder="Email" />

            <InputLabel>Ім’я</InputLabel>
            <Input placeholder="Ім’я" />

            <InputLabel>Номер телефону</InputLabel>
            <Input placeholder="+380" />

            <InputLabel>Номер замовлення</InputLabel>
            <Input placeholder="Введіть повний номер замовлення" />

            <InputLabel>Повідомлення*</InputLabel>
            <TextArea placeholder="Ваше повідомлення"></TextArea>
            <Hint>Максимальна кількість символів - 1000.</Hint>

            <CheckboxWrapper>
              <Checkbox />
              <CheckboxLabel>
                Погоджуюсь з Політикою конфіденційності
              </CheckboxLabel>
            </CheckboxWrapper>

            <Button type="submit">Надіслати повідомлення</Button>
          </Form>
        </FormWrapper>
        <Subscribe />
      </ContactsPageWrapper>
    </StyledCommonWrapper>
  );
};

export default ContactsPage;
