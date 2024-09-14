import { SliderArrowIcon } from "assets/icons";
import { images } from "assets/images";
import { useState } from "react";
import { StyledBookImage, StyledFlexWrapper } from "./PictureViewer.styled";
import { Button } from "./../../../styles/CommonStyled";
import { hasData } from "utils/hasData";

interface IPictureProps {
  image?: string;
  imagesUrls?: Array<string>;
}

const PictureViewer: React.FC<IPictureProps> = ({ image, imagesUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasImgs = imagesUrls && hasData(imagesUrls);

  const handlePrevious = () => {
    if (hasImgs) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? imagesUrls.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (hasImgs) {
      setCurrentIndex((prevIndex) =>
        prevIndex === imagesUrls.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <StyledFlexWrapper>
      {hasImgs ? (
        <>
          <Button>
            <SliderArrowIcon
              style={{ transform: "rotate(180deg)" }}
              onClick={handlePrevious}
            />
          </Button>
          <StyledBookImage>
            <img src={imagesUrls[currentIndex]} alt="img" />
          </StyledBookImage>
          <Button>
            <SliderArrowIcon onClick={handleNext} />
          </Button>
        </>
      ) : (
        <StyledBookImage>
          <img src={image || images.imagePlaceholder} alt="img" />
        </StyledBookImage>
      )}
    </StyledFlexWrapper>
  );
};

export default PictureViewer;
