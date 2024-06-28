import { Input, TextCenter } from "styles/CommonStyled";
import { SubTitle } from "./Filter.styled";
import { Publisher } from "types/Books";

interface IProps {
  publishers: Publisher[];
}

const PublishersSection: React.FC<IProps> = ({ publishers }) => {
  return (
    <section>
      <SubTitle>Видавництво</SubTitle>
      <Input type="text" placeholder="Пошук видавництва" />

      {publishers &&
        publishers.length > 0 &&
        publishers.map(
          ({ publisher }, index) =>
            !!publisher && (
              <p key={index}>
                <input
                  type="checkbox"
                  id={publisher}
                  name="publisher"
                  value={publisher}
                />
                <label htmlFor="languages">{publisher}</label>
              </p>
            )
        )}
      <TextCenter className="more">Показати більше</TextCenter>
    </section>
  );
};

export default PublishersSection;
