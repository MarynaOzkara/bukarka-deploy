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

  const [maxWidth, setMaxWidth] = useState("1024px");

  const handleResize = () => {
    const windowWidth = window.innerWidth;

    setIsDesktop(windowWidth >= parseInt(breakpoints.tablet));

    // Update maxWidth based on screen size dynamically
    if (windowWidth >= 1024) {
      setMaxWidth("1024px"); // Larger screens
    } else if (windowWidth >= 768) {
      setMaxWidth("768px"); // Tablets
    } else {
      setMaxWidth("100%"); // Mobile devices
    }
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
        <SimpleSlider data={books.newBooks} maxWidth={maxWidth} />
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

        <SimpleSlider data={books.bestsellers} maxWidth={maxWidth} />
      </StyledCategorySlider>
      <StyledCategorySlider>
        {isDesktop ? (
          <CategoryPoster title="АКЦІЇ" filterParams="promotions=true" />
        ) : (
          <MobileCategoryPoster title="АКЦІЇ" filterParams="promotions=true" />
        )}

        <SimpleSlider data={books.promotions} maxWidth={maxWidth} />
      </StyledCategorySlider>
    </>
  );
};

export default CategorySlider;
