import useDebounce from "hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import { Hints } from "styles/CommonStyled";
import { StyledInput } from "../Filter.styled";

interface IProps {
  hints: string[];
  placeholder?: string;
  hasButton?: boolean;
  onHintSelected: (value: string) => void;
}

const FilterSearch: React.FC<IProps> = ({
  hints,
  placeholder,
  onHintSelected,
}) => {
  const [inputQuery, setInputQuery] = useState<string>("");
  const [showHints, setShowHints] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isHintSelected, setIsHintSelected] = useState<boolean>(false);
  const [filteredHints, setFilteredHints] = useState<string[]>([]);

  const hintsRef = useRef<HTMLUListElement>(null);
  const debouncedQuery = useDebounce(inputQuery, 500);

  useEffect(() => {
    if (debouncedQuery && !isHintSelected) {
      const filtered = hints.filter(
        (hint: string) =>
          hint.toLowerCase().includes(debouncedQuery.toLowerCase()) && hint
      );
      setFilteredHints(filtered);
      setShowHints(true);
    } else {
      setShowHints(false);
    }
  }, [debouncedQuery, isHintSelected]);

  useEffect(() => {
    if (
      hintsRef.current &&
      highlightedIndex >= 0 &&
      highlightedIndex < filteredHints.length
    ) {
      const activeItem = hintsRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [highlightedIndex, filteredHints]);

  useEffect(() => {
    const handleClickOutsideHints = (event: MouseEvent) => {
      if (!hintsRef.current?.contains(event.target as Node)) {
        setShowHints(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideHints);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideHints);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const validPattern = /^[0-9a-zA-Z \u0400-\u04ff]*$/;

    if (validPattern.test(inputValue)) {
      setInputQuery(inputValue);
      setIsHintSelected(false);
      setShowHints(!!inputValue);
    }
  };

  const handleHintClick = (hint: string) => {
    setInputQuery(hint);
    setIsHintSelected(true);
    onHintSelected(hint);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown":
        setHighlightedIndex((index) => (index + 1) % filteredHints.length);
        break;
      case "ArrowUp":
        setHighlightedIndex(
          (index) => (index - 1 + filteredHints.length) % filteredHints.length
        );
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          event.preventDefault();
          handleHintClick(filteredHints[highlightedIndex]);
        }
        break;
      case "Escape":
        setShowHints(false);
        break;
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <StyledInput
        type="text"
        pattern="[0-9a-zA-Z\u0400-\u04ff]*"
        maxLength={64}
        value={inputQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={() => setInputQuery("")}
        placeholder={placeholder}
        aria-label="Search items"
      />
      {showHints && (
        <Hints ref={hintsRef} aria-label="Search suggestions">
          {filteredHints.length ? (
            filteredHints.map((hint, index) => (
              <li
                key={index}
                className={index === highlightedIndex ? "highlighted" : ""}
                onClick={() => handleHintClick(hint)}
              >
                {hint.toLowerCase().includes(inputQuery.toLowerCase()) && hint}
              </li>
            ))
          ) : (
            <li>No results</li>
          )}
        </Hints>
      )}
    </div>
  );
};

export default FilterSearch;
