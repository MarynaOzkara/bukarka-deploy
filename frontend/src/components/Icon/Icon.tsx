import sprite from "assets/icons/sprite.svg";

interface IconProps {
  name: string;
  [key: string]: any;
}

const Icon: React.FC<IconProps> = ({ name, ...restProps }) => {
  return (
    <svg {...restProps}>
      <use xlinkHref={`${sprite}#${name}`} />
    </svg>
  );
};

export default Icon;
