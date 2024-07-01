import { Input, TextCenter } from "styles/CommonStyled";
import { Publisher } from "types/Books";
import { useState } from "react";
import { SubTitle } from "../Filter.styled";

interface IProps {
  publishers: Publisher[];
  selected?: string[];
  onChange?: (value: string) => void;
}

const PublishersSection: React.FC<IProps> = ({ publishers }) => {
  const [showAll, setShowAll] = useState(false);
  const visiblePublishers = showAll ? publishers : publishers.slice(0, 6);

  const handleToggleShow = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };
  return (
    <section>
      <SubTitle>Видавництво</SubTitle>
      <Input type="text" placeholder="Пошук видавництва" />

      {visiblePublishers &&
        visiblePublishers.length > 0 &&
        visiblePublishers.map(
          ({ publisher }, index) =>
            !!publisher && (
              <p key={index}>
                <input
                  type="checkbox"
                  id={publisher}
                  name="publisher"
                  value={publisher}
                />
                <label htmlFor={publisher}>{publisher}</label>
              </p>
            )
        )}
      {visiblePublishers.length > 6 && (
        <TextCenter className="more" onClick={handleToggleShow}>
          {showAll ? "Показати менше" : "Показати більше"}
        </TextCenter>
      )}
    </section>
  );
};

export default PublishersSection;
