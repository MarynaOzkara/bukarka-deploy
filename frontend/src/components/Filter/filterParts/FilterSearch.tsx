import { useBooks } from "components/Book";
import { Hints, SearchInput } from "components/Search/Search.styled";
import useDebounce from "hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import { Input } from "styles/CommonStyled";
import { Author } from "types/Books";

interface IProps {
  placeholder?: string;
  hasButton?: boolean;
}

const Search: React.FC<IProps> = ({ placeholder }) => {
  const { authors, fetchAuthors } = useBooks();
  const [inputQuery, setInputQuery] = useState<string>("");
  const [showHints, setShowHints] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isHintSelected, setIsHintSelected] = useState<boolean>(false);

  const hintsRef = useRef<HTMLUListElement>(null);
  const debouncedQuery = useDebounce(inputQuery, 500);

  useEffect(() => {
    if (debouncedQuery && !isHintSelected) {
      //   fetchHints({ keyword: debouncedQuery });
      setShowHints(true);
    } else {
      setShowHints(false);
    }
  }, [debouncedQuery, fetchAuthors, isHintSelected]);

  useEffect(() => {
    if (
      hintsRef.current &&
      highlightedIndex >= 0 &&
      highlightedIndex < authors.length
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
  }, [highlightedIndex, authors]);

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

  const handleHintClick = (hint: Author) => {
    console.log(hint);
    const searchKey = hint.author
      ?.toLowerCase()
      .includes(inputQuery.toLowerCase())
      ? hint.author
      : "";
    setInputQuery(searchKey);
    setIsHintSelected(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown":
        setHighlightedIndex((index) => (index + 1) % authors.length);
        break;
      case "ArrowUp":
        setHighlightedIndex(
          (index) => (index - 1 + authors.length) % authors.length
        );
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          event.preventDefault();
          handleHintClick(authors[highlightedIndex]);
        }
        break;
      case "Escape":
        setShowHints(false);
        break;
    }
  };

  return (
    <>
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
          {authors.length > 0 ? (
            authors.map((hint, index) => (
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
    </>
  );
};

export default Search;
