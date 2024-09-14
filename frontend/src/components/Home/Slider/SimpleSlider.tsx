import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import BookCard from "../BookCard";
import Loader from "components/Loader";
import { SliderArrowIcon } from "assets/icons";
import { IRootState } from "appRedux/store";
import {
  selectBooksData,
  selectBooksError,
  selectBooksStatus,
} from "appRedux/books/selectors";
import { useAppDispatch } from "appRedux/hooks";
import {
  StyledSlider,
  StyledPrevArrow,
  StyledNextArrow,
} from "./SimpleSlider.styled";

interface IProps {
  _id: string;
  title: string;
  author: string;
  image: string | null;
  price: number;
  rating: number;
  imagesUrls: Array<string>
}

interface IDataBooks {
  data: IProps[];
  maxWidth?: string;
}

export function NextArrow(props: any) {
  const { className, style, onClick, isVisible } = props;
  return (
    <StyledNextArrow
      style={{ display: isVisible ? "flex" : "none" }}
      onClick={onClick}
    >
      <SliderArrowIcon />
    </StyledNextArrow>
  );
}

export function PrevArrow(props: any) {
  const { className, style, onClick, isVisible } = props;
  return (
    <StyledPrevArrow
      style={{ display: isVisible ? "flex" : "none" }}
      onClick={onClick}
    >
      <SliderArrowIcon />
    </StyledPrevArrow>
  );
}

const SimpleSlider: React.FC<IDataBooks> = ({ data, maxWidth = "1220px" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = data.length;
  const dispatch = useAppDispatch();
  const booksData = useSelector((state: IRootState) => selectBooksData(state));
  const status = useSelector((state: IRootState) => selectBooksStatus(state));
  const error = useSelector((state: IRootState) => selectBooksError(state));

  if (status === "loading") {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  let settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    beforeChange: (oldIndex: number, newIndex: number) =>
      setCurrentSlide(newIndex),
    prevArrow: <PrevArrow isVisible={currentSlide > 0} />,
    nextArrow: <NextArrow isVisible={currentSlide < totalSlides - 5} />,
    responsive: [
      {
        breakpoint: 1219,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          initialSlide: 1,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 1,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 959,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },

      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },

      {
        breakpoint: 559,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 3,
        },
      },

      {
        breakpoint: 479,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 3,
        },
      },

      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1.9,
          slidesToScroll: 0.5,
          initialSlide: 0,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <StyledSlider maxWidth={maxWidth} {...settings}>
        {data.map((item, index) => (
          <BookCard
            _id={item._id}
            image={item.image}
            key={item._id}
            price={item.price}
            author={item.author}
            title={item.title}
            rating={item.rating}
            index={index}
            imagesUrls={item.imagesUrls}
          />
        ))}
      </StyledSlider>
    </div>
  );
};

export default SimpleSlider;
