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
import bestsellers from "./../../assets/data/bestsellers";

const SearchPage = () => {
  const { searchResults, handleSearch } = useBooks(); // Get books and search function from context
  const [searchParams, setSearchParams] = useSearchParams(); // For managing URL params

  const { category, subcategory, bestsellers, promotions } = useParams(); // Get category and subcategory from URL params

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

    // Fetch the filtered books with sorting applied
    handleSearch({
      category,
      subcategory,
      keyword,
      page,
      sortBy,
      orderSort,
    });
  }, [searchParams, sortBy, orderSort, category, subcategory]);

  // Handle sort changes
  const handleSortChange = (sortKey: string, sortOrder: string) => {
    setSortBy(sortKey);
    setOrderSort(sortOrder);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      sortBy: sortKey,
      orderSort: sortOrder,
      page: "1", // Reset to page 1 when sorting changes
    });
  };

  // Handle filter changes and reset page to 1
  const handleFilterChange = (filters: any) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...filters, // Apply new filters
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
          <ButtonGreyYellow>Сортування</ButtonGreyYellow>
        </div>
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

        {hasSearchResults && (
          <>
            {isDesktop && <Sort onSortChange={handleSortChange} />}
            {isDesktop && (
              <Filter
                isDesktop={isDesktop}
                onFilterChange={handleFilterChange}
              />
            )}
          </>
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
