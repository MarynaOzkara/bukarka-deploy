import { useEffect, useState } from "react";
import CategoryPoster from "../CategoryPoster";
import SimpleSlider from "../Slider/SimpleSlider";
import Loader from "components/Loader";
import { breakpoints } from "constants/breakpoints";
import MobileCategoryPoster from "../CategoryPoster/MobileCategoryPoster";
import { instance } from "utils/fetchInstance";
import { StyledCategorySlider } from "./CategorySlider.styled";
import { CenteredLoaderWrapper } from "pages/CommonPages.styled";

interface IProps {
  _id: string;
  title: string;
  author: string;
  image: string | null;
  price: number;
  rating: number;
}

const CategorySlider = () => {
  const [books, setBooks] = useState({
    newBooks: [],
    bestsellers: [],
    promotions: [],
  });

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await instance.get(`/api/books/type`);
        const data = await response.data;
        setBooks({
          newBooks: data.newBooks,
          bestsellers: data.bestsellers,
          promotions: data.promotions,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Помилка при виконанні запиту:");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <CenteredLoaderWrapper>
        <Loader />
      </CenteredLoaderWrapper>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <>
      <StyledCategorySlider>
        {isDesktop ? (
          <CategoryPoster title="НОВИНКИ" filterParams="new=true" />
        ) : (
          <MobileCategoryPoster title="НОВИНКИ" filterParams="new=true" />
        )}
        <SimpleSlider data={books.newBooks} maxWidth="1024px" />
      </StyledCategorySlider>
      <StyledCategorySlider>
        {isDesktop ? (
          <CategoryPoster title="БЕСТСЕЛЕРИ" filterParams="bestsellers=true" />
        ) : (
          <MobileCategoryPoster
            title="БЕСТСЕЛЕРИ"
            filterParams="bestsellers=true"
          />
        )}

        <SimpleSlider data={books.bestsellers} maxWidth="1024px" />
      </StyledCategorySlider>
      <StyledCategorySlider>
        {isDesktop ? (
          <CategoryPoster title="АКЦІЇ" filterParams="promotions=true" />
        ) : (
          <MobileCategoryPoster title="АКЦІЇ" filterParams="promotions=true" />
        )}

        <SimpleSlider data={books.promotions} maxWidth="1024px" />
      </StyledCategorySlider>
    </>
  );
};

export default CategorySlider;
