import { useEffect, useState } from "react";
import { getNovaPoshtaCities } from "utils/postApi";
import { Label, SubTitle, Wrapper } from "../OrderCommonStyled";
import {
  AddressInput,
  CityInput,
  FreeInfo,
  Option,
  Options,
  RadioButton,
  RadioInput,
  RadioWrapper,
} from "./Delivery.styled";
import { DELIVERY_METHOD } from "constants/order";

interface DeliveryDataProps {
  setDeliveryMethod: React.Dispatch<React.SetStateAction<string>>;
  setDeliveryCity: React.Dispatch<React.SetStateAction<string>>;
  setDeliveryAddress: React.Dispatch<React.SetStateAction<string>>;
}

const Delivery: React.FC<DeliveryDataProps> = ({
  setDeliveryMethod,
  setDeliveryCity,
  setDeliveryAddress,
}) => {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [selectedRadio, setSelectedRadio] = useState("");

  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cities = await getNovaPoshtaCities();
        // console.log(cities);
        setOptions(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setCity(value);
    setDeliveryCity(value);

    if (value !== "") {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }

    setAddress("");
    setDeliveryAddress("");
  };

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setDeliveryAddress(e.target.value);
    setDeliveryCity(city);
    // console.log(address);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".Options")) {
      setShowOptions(false);
    }
  };

  const handleOptionClick = (value: string) => {
    setCity(value);
    setShowOptions(false);
  };

  const handleOptionChange = (value: string) => {
    setSelectedRadio(value);
    setDeliveryMethod(value);
  };

  return (
    <Wrapper>
      <SubTitle>Доставка</SubTitle>
      <FreeInfo>Безкоштовно при замовленні на суму від 500 грн.</FreeInfo>
      <Label htmlFor="cityInput">Місто*</Label>
      <CityInput
        id="cityInput"
        type="text"
        placeholder="Введіть назву населеного пункту"
        value={city}
        onChange={handleCityInputChange}
        autoComplete="off"
      />
      {showOptions && (
        <Options role="listbox">
          {options
            .filter((option) =>
              option.toLowerCase().startsWith(city.toLowerCase())
            )
            .slice(0, 3)
            .map((option) => (
              <Option
                key={option}
                role="option"
                aria-selected="false"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </Option>
            ))}
        </Options>
      )}

      <RadioWrapper>
        <Label>Оберіть спосіб доставки*</Label>
        <RadioButton>
          <RadioInput
            type="radio"
            value="option1"
            checked={selectedRadio === DELIVERY_METHOD.ukrPoshta}
            onChange={() => handleOptionChange(DELIVERY_METHOD.ukrPoshta)}
          />
          <span>{DELIVERY_METHOD.ukrPoshta}</span>
        </RadioButton>
        <RadioButton>
          <RadioInput
            type="radio"
            value="option2"
            checked={selectedRadio === DELIVERY_METHOD.novaPoshtaBranch}
            onChange={() =>
              handleOptionChange(DELIVERY_METHOD.novaPoshtaBranch)
            }
          />
          <span>{DELIVERY_METHOD.novaPoshtaBranch}</span>
        </RadioButton>
        <RadioButton>
          <RadioInput
            type="radio"
            value="option3"
            checked={selectedRadio === DELIVERY_METHOD.novaPoshtaParcelLocker}
            onChange={() =>
              handleOptionChange(DELIVERY_METHOD.novaPoshtaParcelLocker)
            }
          />
          <span>{DELIVERY_METHOD.novaPoshtaParcelLocker}</span>
        </RadioButton>
        <RadioButton>
          <RadioInput
            type="radio"
            value="option4"
            checked={selectedRadio === DELIVERY_METHOD.novaPoshtaCourier}
            onChange={() =>
              handleOptionChange(DELIVERY_METHOD.novaPoshtaCourier)
            }
          />
          <span>{DELIVERY_METHOD.novaPoshtaCourier}</span>
        </RadioButton>
      </RadioWrapper>

      {selectedRadio === DELIVERY_METHOD.novaPoshtaCourier && (
        <div>
          <Label htmlFor="address">Введіть адресу доставки*</Label>
          <AddressInput
            id="address"
            type="text"
            placeholder="Наприклад, бульвар Т.Шевченко, буд. 20, кв. 15"
            value={address}
            onChange={handleAddressInputChange}
          />
        </div>
      )}
    </Wrapper>
  );
};

export default Delivery;
