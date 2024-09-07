import { Filter, Pagination, Sort } from "components";
import { useBooks } from "components/Book";
import { PageLayout } from "components/Layout";
import Modal from "components/Modal";
import { breakpoints } from "constants/breakpoints";
import CatalogBookCard from "pages/CatalogPage/CatalogBookCard";
import { StyledFlexWrapper } from "pages/CatalogPage/CatalogPage.style";
import { StyledFlexWrap } from "pages/CommonPages.styled";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ButtonGreyYellow, TextCenter } from "styles/CommonStyled";
import { hasData } from "utils/hasData";

const SearchPage = () => {
  const { searchResults, handleSearch } = useBooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [orderSort, setOrderSort] = useState("asc");
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

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
    const keyword = searchParams.get("keyword") || "";

    setSearchParams({
      keyword,
      page: page.toString(),
    });
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");

  const showModal = (content: string, isSize: boolean) => {
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
    setKeyword(keyword);
    handleSearch({ keyword, page, sortBy, orderSort });
  }, [searchParams, sortBy, orderSort]);

  const handleSortChange = (sortKey: string, sortOrder: string) => {
    setSortBy(sortKey);
    setOrderSort(sortOrder);
    setSearchParams({
      page: "1",
      sortBy: sortKey,
      orderSort: sortOrder,
      keyword,
    });
  };

  const hasSearchResults = hasData(searchResults);

  return (
    <PageLayout label="Результати пошуку" books={searchResults}>
      {!isDesktop && (
        <div className="button-container">
          <ButtonGreyYellow onClick={() => showModal("filter", isDesktop)}>
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
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {!isDesktop && isModalOpen && (
          <Modal close={closeModal} showCloseButton={true}>
            {modalContent === "filter" && (
              <Filter isDesktop={isDesktop} onClose={closeModal} />
            )}
          </Modal>
        )}

        {hasSearchResults && (
          <>
            {isDesktop && <Sort onSortChange={handleSortChange} />}
            {isDesktop && <Filter isDesktop={isDesktop} />}
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
            <Filter isDesktop={isDesktop} onClose={closeModal} />
          )}
        </Modal>
      )}
    </PageLayout>
  );
};

export default SearchPage;
