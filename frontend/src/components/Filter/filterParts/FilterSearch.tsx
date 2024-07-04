import { useBooks } from "components/Book";

import useDebounce from "hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import { Hints, Input } from "styles/CommonStyled";

interface IProps {
  placeholder?: string;
  hasButton?: boolean;
}

const FilterSearch: React.FC<IProps> = ({ placeholder }) => {
  const { hints, fetchHints } = useBooks();
  const [inputQuery, setInputQuery] = useState<string>("");
  const [showHints, setShowHints] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isHintSelected, setIsHintSelected] = useState<boolean>(false);

  const hintsRef = useRef<HTMLUListElement>(null);
  const debouncedQuery = useDebounce(inputQuery, 500);

  useEffect(() => {
    if (debouncedQuery && !isHintSelected) {
      fetchHints({ author: debouncedQuery });
      setShowHints(true);
    } else {
      setShowHints(false);
    }
  }, [debouncedQuery, fetchHints, isHintSelected]);

  useEffect(() => {
    if (
      hintsRef.current &&
      highlightedIndex >= 0 &&
      highlightedIndex < hints.length
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
  }, [highlightedIndex, hints]);

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
    const validPattern = /^[0-9a-zA-Z\u0400-\u04ff]*$/;

    if (validPattern.test(inputValue)) {
      setInputQuery(inputValue);
      setIsHintSelected(false);
      setShowHints(!!inputValue);
    }
  };

  const handleHintClick = (hint: any) => {
    const value = Object.values(hint).join();

    const searchKey = value.toLowerCase().includes(inputQuery.toLowerCase())
      ? value
      : "";
    setInputQuery(searchKey);
    setIsHintSelected(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown":
        setHighlightedIndex((index) => (index + 1) % hints.length);
        break;
      case "ArrowUp":
        setHighlightedIndex(
          (index) => (index - 1 + hints.length) % hints.length
        );
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          event.preventDefault();
          handleHintClick(hints[highlightedIndex]);
        }
        break;
      case "Escape":
        setShowHints(false);
        break;
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Input
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
          {hints.length > 0 ? (
            hints.map((hint, index) => (
              <li
                key={index}
                className={index === highlightedIndex ? "highlighted" : ""}
                onClick={() => handleHintClick(hint)}
              >
                {hint.author.includes(inputQuery) && hint.author}
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
