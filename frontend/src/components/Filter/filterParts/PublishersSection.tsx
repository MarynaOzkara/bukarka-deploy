import { Publisher } from "types/Books";
import { SubTitle } from "../Filter.styled";
import FilterSearch from "./FilterSearch";
import ShowMore from "./ShowMore";

interface IProps {
  publishers: Publisher[];
  selectedPublishers: string[];
  onPublishersChange: (value: string[]) => void;
}

const PublishersSection: React.FC<IProps> = ({
  publishers,
  selectedPublishers,
  onPublishersChange,
}) => {
  // const { hints, fetchHints } = useBooks();
  // const debouncedQuery = useDebounce(inputQuery, 500);

  // useEffect(() => {
  //   if (debouncedQuery && !isHintSelected) {
  //     fetchHints({ author: debouncedQuery } || { publisher: debouncedQuery });
  //     setShowHints(true);
  //   } else {
  //     setShowHints(false);
  //   }
  // }, [debouncedQuery, fetchHints, isHintSelected]);

  const publishersOptions = publishers
    .map((publisher) => publisher.publisher)
    .filter((item) => !!item);

  const handlePublishersChange = (publisher: string) => {
    onPublishersChange(
      selectedPublishers.includes(publisher)
        ? selectedPublishers.filter((p) => p !== publisher)
        : [...selectedPublishers, publisher]
    );
  };

  const handleHintSelected = (value: string) => {
    handlePublishersChange(value);
  };

  return (
    <section>
      <SubTitle>Видавництво</SubTitle>

      <FilterSearch
        placeholder="Пошук видавництва"
        onHintSelected={handleHintSelected}
        hints={publishersOptions}
      />

      <ShowMore
        options={publishersOptions}
        onChange={handlePublishersChange}
        selected={selectedPublishers}
      />
    </section>
  );
};

export default PublishersSection;
