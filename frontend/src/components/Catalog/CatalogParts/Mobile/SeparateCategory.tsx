import { hasData } from "utils/hasData";
import { SmallSubTitle, StyledItem, SubtitleLink } from "../../Catalog.styled";
import { ArrowMobileIcon } from "assets/icons";

interface IProps {
  category: string;
  subcategory: string;
  links: string[];
  closeModal: () => void;
  closeParentModal: () => void;
}

const SeparateCategory: React.FC<IProps> = ({
  category,
  subcategory,
  links,
  closeModal,
  closeParentModal,
}) => {
  const hasLinks = hasData(links);

  return (
    <>
      <SubtitleLink
        to={`/catalog/${encodeURIComponent(category)}`}
        onClick={closeParentModal}
      >
        {category}
      </SubtitleLink>
      <section className="sub-section">
        <SmallSubTitle
          to={`/catalog/${encodeURIComponent(category)}/${encodeURIComponent(
            subcategory
          )}`}
          onClick={closeParentModal}
        >
          {subcategory}
        </SmallSubTitle>
        <ul>
          {hasLinks &&
            links.map((link: string, linkIndex: number) => (
              <li key={linkIndex}>
                <StyledItem
                  onClick={closeParentModal}
                  to={`/catalog/${encodeURIComponent(
                    category
                  )}/${encodeURIComponent(subcategory)}/${encodeURIComponent(
                    link
                  )}`}
                >
                  {link}
                </StyledItem>
              </li>
            ))}
          <li className="back-button" onClick={closeModal}>
            <ArrowMobileIcon />
            <b>Назад</b>
          </li>
        </ul>
      </section>
    </>
  );
};
export default SeparateCategory;
