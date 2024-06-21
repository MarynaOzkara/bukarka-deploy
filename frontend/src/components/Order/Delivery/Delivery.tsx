import { useEffect, useState } from "react";
import {
  getNovaPoshtaCities,
  getNovaPoshtaCitiesObject,
  getNovaPoshtaWarehouses,
} from "utils/postApi";
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

interface City {
  Description: string;
  Ref: string;
}

const Delivery: React.FC<DeliveryDataProps> = ({
  setDeliveryMethod,
  setDeliveryCity,
  setDeliveryAddress,
}) => {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [selectedRadio, setSelectedRadio] = useState("");

  const [showCityOptions, setShowCityOptions] = useState(false);
  const [showWarehouseOptions, setShowWarehouseOptions] = useState(false);
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [warehouseOptions, setWarehouseOptions] = useState<string[]>([]);

  const [cities, setCities] = useState<City[]>([]);
  const [cityRef, setCityRef] = useState<string>("");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await getNovaPoshtaCitiesObject();
        setCities(citiesData);
        const cityDescriptions = citiesData.map((city) => city.Description);
        setCityOptions(cityDescriptions);
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

  const handleCityInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setCity(value);
    setDeliveryCity(value);

    if (value !== "") {
      setShowCityOptions(true);
      const selectedCity = cities.find((city) => city.Description === value);
      if (selectedCity) {
        setCityRef(selectedCity.Ref);
        const warehouses = await getNovaPoshtaWarehouses(selectedCity.Ref);
        const warehouseDescriptions = warehouses.map((warehouse) => warehouse.Description);
        setWarehouseOptions(warehouseDescriptions);
      }
    } else {
      setShowCityOptions(false);
      setWarehouseOptions([]);
    }

    setAddress("");
    setDeliveryAddress("");
  };

  const handleCityOptionClick = async (value: string) => {
    setCity(value);
    setShowCityOptions(false);

    const selectedCity = cities.find((city) => city.Description === value);
    if (selectedCity) {
      setCityRef(selectedCity.Ref);
      const warehouses = await getNovaPoshtaWarehouses(selectedCity.Ref);
      const warehouseDescriptions = warehouses.map((warehouse) => warehouse.Description);
      setWarehouseOptions(warehouseDescriptions);
      setShowWarehouseOptions(true);
    }
  };

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setDeliveryAddress(e.target.value);
  };

  const handleWarehouseOptionClick = (value: string) => {
    setAddress(value);
    setDeliveryAddress(value);
    setShowWarehouseOptions(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".Options")) {
      setShowCityOptions(false);
      setShowWarehouseOptions(false);
    }
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
      {showCityOptions && (
        <Options role="listbox">
          {cityOptions
            .filter((option) =>
              option.toLowerCase().startsWith(city.toLowerCase())
            )
            .slice(0, 3)
            .map((option) => (
              <Option
                key={option}
                role="option"
                aria-selected="false"
                onClick={() => handleCityOptionClick(option)}
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

      {selectedRadio === DELIVERY_METHOD.novaPoshtaBranch && (
        <div>
          <Label htmlFor="branch">Оберіть відділення або поштомат*</Label>
          <Options role="listbox">
            {warehouseOptions.map((option) => (
              <Option
                key={option}
                role="option"
                aria-selected="false"
                onClick={() => handleWarehouseOptionClick(option)}
              >
                {option}
              </Option>
            ))}
          </Options>
        </div>
      )}
    </Wrapper>
  );
};

export default Delivery;
