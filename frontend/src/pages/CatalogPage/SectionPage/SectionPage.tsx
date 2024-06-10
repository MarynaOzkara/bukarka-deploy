import { useParams } from "react-router-dom";

const SectionPage = () => {
  const { category, subcategory, link } = useParams();

  return (
    <div>
      <h2>{category}</h2>
      {subcategory && <h3>{subcategory}</h3>}
      {link && <h4>{link}</h4>}
    </div>
  );
};

export default SectionPage;
