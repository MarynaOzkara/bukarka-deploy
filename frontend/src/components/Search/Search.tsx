import { IBookItem } from "components/Book";
import useDebounce from "hooks/useDebounce";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FormButton,
  Hints,
  Input,
  StyledForm,
  StyledLensIcon,
} from "./Search.styled";
import { SearchContext } from "./SearchContext";

export const Search = () => {
  const { hints, loading, handleSearch, fetchHints } =
    useContext(SearchContext);
  const [query, setQuery] = useState<string>("");
  const [showHints, setShowHints] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const hintsRef = useRef<HTMLUListElement>(null);

  const debouncedQuery = useDebounce(query, 500);

  const navigate = useNavigate();
  const location = useLocation();

  const goToCatalog = useCallback(
    (searchParams: Record<string, any>) => {
      const queryString = new URLSearchParams(searchParams).toString();
      navigate(`/catalog?${queryString}`);
      setHighlightedIndex(-1);
      setShowHints(false);
    },
    [navigate]
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const authorQuery = params.get("author") || "";
    const titleQuery = params.get("title") || "";
    const searchQuery = authorQuery || titleQuery;

    setQuery(searchQuery);

    if (searchQuery) {
      handleSearch({ author: authorQuery, title: titleQuery });
    }
  }, [location.search, handleSearch]);

  useEffect(() => {
    if (debouncedQuery) {
      fetchHints({ title: debouncedQuery, author: debouncedQuery });
      setShowHints(true);
    } else {
      setShowHints(false);
    }
  }, [debouncedQuery, fetchHints]);

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
    document.addEventListener("mousedown", handleClickOutsideHints);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideHints);
    };
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setShowHints(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchParams = { author: query, title: query };
    handleSearch(searchParams);
    goToCatalog(searchParams);
  };

  const handleHintClick = (hint: IBookItem) => {
    const searchParams = {
      author: hint.author?.toLowerCase().includes(query.toLowerCase())
        ? hint.author
        : "",
      title: hint.title?.toLowerCase().includes(query.toLowerCase())
        ? hint.title
        : "",
    };
    setQuery(searchParams.author || searchParams.title);
    handleSearch(searchParams);
    goToCatalog(searchParams);
  };

  const handleClickOutsideHints = (event: MouseEvent) => {
    if (hintsRef.current && !hintsRef.current.contains(event.target as Node)) {
      setShowHints(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex === hints.length - 1 ? 0 : prevIndex + 1
      );
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex <= 0 ? hints.length - 1 : prevIndex - 1
      );
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      event.preventDefault();

      handleHintClick(hints[highlightedIndex]);
    } else if (event.key === "Escape") {
      setShowHints(false);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLensIcon />
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Знайти книгу"
      />

      {showHints && hints.length > 0 && (
        <Hints ref={hintsRef}>
          {loading ? (
            <li>Loading...</li>
          ) : (
            hints.map(
              (hint, index) =>
                hint && (
                  <li
                    className={`${
                      index === highlightedIndex ? "highlighted" : ""
                    }`}
                    key={index}
                    onClick={() => handleHintClick(hint)}
                  >
                    {(hint.author
                      ?.toLowerCase()
                      .includes(query.toLowerCase()) &&
                      hint.author) ||
                      (hint.title
                        ?.toLowerCase()
                        .includes(query.toLowerCase()) &&
                        hint.title)}
                  </li>
                )
            )
          )}
        </Hints>
      )}

      <FormButton>Знайти</FormButton>
    </StyledForm>
  );
};
