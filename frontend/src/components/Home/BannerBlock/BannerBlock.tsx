import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { banners } from "constants/banners";
import { SliderArrowIcon } from "assets/icons";
import { images } from "assets/images";
import {
  Image,
  ImageWrapper,
  SliderWrapper,
  StyledNextArrow,
  StyledPrevArrow,
  StyledSlider,
} from "./BannerBlock.styled";
import { instance } from "utils/fetchInstance";

type Props = {};

function NextArrow(props: any) {
  const { onClick, isVisible } = props;
  return (
    <StyledNextArrow
      style={{ display: isVisible ? "flex" : "none" }}
      onClick={onClick}
    >
      <SliderArrowIcon />
    </StyledNextArrow>
  );
}

function PrevArrow(props: any) {
  const { onClick, isVisible } = props;
  return (
    <StyledPrevArrow
      style={{ display: isVisible ? "flex" : "none" }}
      onClick={onClick}
    >
      <SliderArrowIcon />
    </StyledPrevArrow>
  );
}

const BannerBlock = (props: Props) => {
  const [allBanners, setAllBanners] = useState(banners);

  useEffect(() => {
    const fetchDynamicBanners = async () => {
      try {
        const response = await instance.get(`/api/books/promotions`);

        const dynamicBanners = response.data.data.map((book: any) => ({
          src: book.image || images.imagePlaceholder,
          alt: book.title,
          link: `/books/${book._id}`,
        }));
        setAllBanners((prevBanners) => [...prevBanners, ...dynamicBanners]);
      } catch (error) {
        console.error("Error fetching dynamic banners:", error);
        setAllBanners(banners);
      }
    };

    fetchDynamicBanners();
  }, []);

  const settings = {

    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 15000,
    cssEase: "linear",
    variableWidth: true,
    prevArrow: <PrevArrow isVisible={true} />,
    nextArrow: <NextArrow isVisible={true} />,
  };

  return (
    <SliderWrapper>
      <StyledSlider {...settings}>
        {allBanners.map((banner, index) => (
          <ImageWrapper key={index}>
            <Link to={banner.link}>
              <Image src={banner.src} alt={banner.alt} />
            </Link>
          </ImageWrapper>
        ))}
      </StyledSlider>
    </SliderWrapper>
  );
};

export default BannerBlock;
