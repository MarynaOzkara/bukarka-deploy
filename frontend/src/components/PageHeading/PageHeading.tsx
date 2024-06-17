import { BreadCrumbs, Label } from "pages/CommonPages.styled";
import { useParams } from "react-router-dom";

const PageHeading = () => {
  const { category, subcategory, link } = useParams();
  return (
    <>
      <BreadCrumbs>Каталог | {category} </BreadCrumbs>
      <Label> {link || subcategory || category || "Усі книги"} </Label>
    </>
  );
};

export default PageHeading;
