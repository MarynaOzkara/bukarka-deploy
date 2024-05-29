import { FC, ReactNode, createContext, useState } from "react";

interface SearchContextProps {
  query: string;
  results: { name: string }[];
  handleSearch: (query: string) => void;
}

const SearchContext = createContext<SearchContextProps>({
  query: "",
  results: [],
  handleSearch: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

const SearchContextProvider: FC<ProviderProps> = ({ children }) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<{ name: string }[]>([]);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    try {
      const response = await fetch(`/api/search?q=${searchQuery}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <SearchContext.Provider value={{ query, results, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
