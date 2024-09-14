import { Filter, Pagination, Sort } from "components";
import { useBooks } from "components/Book";
import { PageLayout } from "components/Layout";
import Modal from "components/Modal";
import { breakpoints } from "constants/breakpoints";
import CatalogBookCard from "pages/CatalogPage/CatalogBookCard";
import { StyledFlexWrapper } from "pages/CatalogPage/CatalogPage.style";
import { StyledFlexWrap } from "pages/CommonPages.styled";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ButtonGreyYellow, TextCenter } from "styles/CommonStyled";
import { hasData } from "utils/hasData";

const SearchPage = () => {
  const { searchResults, handleSearch } = useBooks(); // Get books and search function from context
  const [searchParams, setSearchParams] = useSearchParams(); // For managing URL params

  const { category, subcategory } = useParams(); // Get category and subcategory from URL params

  // State to track sorting
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
  const [orderSort, setOrderSort] = useState(
    searchParams.get("orderSort") || "asc"
  );

  const { currentPage, setCurrentPage, totalPages } = useBooks();

  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= parseInt(breakpoints.tablet)
  );

  const handleResize = () => {
    setIsDesktop(window.innerWidth >= parseInt(breakpoints.tablet));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle page change, preserve filters and sorting
  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }

    // Preserve the existing search params and update the page
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: page.toString(),
    });
  };

  // Show filter modal (for mobile devices)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");

  const showModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent("");
    setIsModalOpen(false);
  };

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const keyword = searchParams.get("keyword") || "";
    const filters = Object.fromEntries(searchParams);

    // Fetch the filtered and sorted books
    handleSearch({
      category,
      subcategory,
      keyword,
      page,
      sortBy,
      orderSort,
      ...filters, // Include active filters
    });
  }, [searchParams, sortBy, orderSort, category, subcategory]);

  const [showSortButtons, setShowSortButtons] = useState(false);

  const toggleSort = () => {
    setShowSortButtons((prev) => !prev); // Toggle true/false
  };

  // Handle sort changes
  const handleSortChange = (sortKey: string, sortOrder: string) => {
    setSortBy(sortKey);
    setOrderSort(sortOrder);

    // Keep the filters in the searchParams and update sorting
    setSearchParams({
      ...Object.fromEntries(searchParams),
      sortBy: sortKey, // New sorting field
      orderSort: sortOrder, // New sorting order
      page: "1", // Reset to page 1 when sorting changes
    });
  };

  // Handle filter changes and reset page to 1
  const handleFilterChange = (filters: any) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...filters, // Apply new filters
      sortBy, // Retain the current sorting key
      orderSort, // Retain the current sorting order
      page: "1", // Reset to page 1 when filters change
    });
  };

  const hasSearchResults = hasData(searchResults);

  return (
    <PageLayout label="Результати пошуку" books={searchResults}>
      {!isDesktop && (
        <div className="button-container">
          <ButtonGreyYellow onClick={() => showModal("filter")}>
            Фiльтр
          </ButtonGreyYellow>
          <ButtonGreyYellow onClick={toggleSort}>Сортування</ButtonGreyYellow>
        </div>
      )}

      {showSortButtons && (
        <Sort isDesktop={!isDesktop} onSortChange={handleSortChange} />
      )}

      {!isDesktop && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <StyledFlexWrapper>
        {!isDesktop && isModalOpen && (
          <Modal close={closeModal} showCloseButton={true}>
            {modalContent === "filter" && (
              <Filter
                isDesktop={isDesktop}
                onClose={closeModal}
                onFilterChange={handleFilterChange}
              />
            )}
          </Modal>
        )}
        {hasSearchResults && isDesktop && (
          <Sort isDesktop={isDesktop} onSortChange={handleSortChange} />
        )}

        {isDesktop && (
          <Filter isDesktop={isDesktop} onFilterChange={handleFilterChange} />
        )}
        <StyledFlexWrap>
          {hasSearchResults ? (
            searchResults.map((result, index) => (
              <CatalogBookCard key={index} {...result} />
            ))
          ) : (
            <TextCenter>No results found</TextCenter>
          )}
        </StyledFlexWrap>
      </StyledFlexWrapper>

      {hasSearchResults && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {!isDesktop && isModalOpen && (
        <Modal close={closeModal} showCloseButton={true}>
          {modalContent === "filter" && (
            <Filter
              isDesktop={isDesktop}
              onClose={closeModal}
              onFilterChange={handleFilterChange}
            />
          )}
        </Modal>
      )}
    </PageLayout>
  );
};

export default SearchPage;
