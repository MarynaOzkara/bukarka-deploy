import { Pagination, Sort } from "components";
import { useBooks } from "components/Book";
import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useParams, useSearchParams } from "react-router-dom";

import Filter from "components/Filter";
import { PageLayout } from "components/Layout";
import Modal from "components/Modal";
import Subscribe from "components/Subscribe";
import { breakpoints } from "constants/breakpoints";
import { adjustAgeValue } from "constants/catalog";
import { BreadCrumbs, Label } from "pages/CommonPages.styled";
import { Link } from "react-router-dom";
import { ButtonGreyYellow } from "styles/CommonStyled";
import { hasData } from "utils/hasData";
import { StyledFlexWrapper } from "./CatalogPage.style";
import SectionContent from "./SectionContent";

const CatalogPage: React.FC = () => {
  const { category, subcategory, link } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const { books, fetchBooks } = useBooks();
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

    setSearchParams({
      keyword,
      page: page.toString(),
    });
  };

  const hasBooks = hasData(books);

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const news = !!searchParams.get("new") || undefined;
    const bestsellers = !!searchParams.get("bestsellers") || undefined;
    const promotions = !!searchParams.get("promotions") || undefined;

    const ageReplaced =
      subcategory === "Книги за віком" ? adjustAgeValue(link ?? "") : "";
    const subcategoryReplaced = subcategory !== "Книги за віком" ? link : "";

    fetchBooks({
      category,
      subcategory: subcategoryReplaced,
      keyword,
      link,
      age: ageReplaced,
      new: news,
      bestsellers,
      promotions,
      page,
      sortBy,
      orderSort,
    });
  }, [searchParams, category, link, keyword, subcategory, sortBy, orderSort]);

  const handleSortChange = useCallback(
    (sortBy: string, orderSort: string) => {
      // Just update the search params, useEffect will handle fetching
      setSortBy(sortBy);
      setOrderSort(orderSort);
      setSearchParams({
        ...Object.fromEntries(searchParams), // Keep the existing params
        sortBy,
        orderSort,
        page: "1", // Reset to page 1 when sorting changes
      });
    },
    [setSearchParams, searchParams]
  );

  const handleFilterChange = (filters: any) => {
    // Merge new filters with existing searchParams and reset page to 1
    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...filters, // Apply new filters
      page: "1", // Reset to page 1 when filters change
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

  const renderBreadcrumbs = () => {
    return (
      <BreadCrumbs>
        <Link to="/catalog">Каталог | </Link>
        {category && (
          <Link to={`/catalog/${encodeURI(category)}`}> {category} </Link>
        )}
      </BreadCrumbs>
    );
  };

  const renderLabels = () => {
    return <Label>{link || subcategory || category || "Усі книги"}</Label>;
  };

  return (
    <PageLayout books={books}>
      <>
        {renderBreadcrumbs()}
        {renderLabels()}
      </>

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
        {isDesktop && (
          <Filter isDesktop={isDesktop} onFilterChange={handleFilterChange} />
        )}

        {isDesktop && hasBooks && <Sort onSortChange={handleSortChange} />}

        {<Outlet context={{ books }} /> || <SectionContent data={books} />}
      </StyledFlexWrapper>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <Subscribe />

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

export default CatalogPage;
