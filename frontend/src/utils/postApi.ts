import axios from "axios";

interface City {
  Description: string;
  Ref: string;
}

interface Warehouse {
  Description: string;
}

const apiKey = process.env.NOVAPOSHTA_API_KEY;
const apiEndpoint = "https://api.novaposhta.ua/v2.0/json/";

export const getNovaPoshtaCities = async (): Promise<string[]> => {
  try {
    const requestData = {
      apiKey: apiKey,
      modelName: "Address",
      calledMethod: "getCities",
      methodProperties: {},
    };

    const response = await axios.post(apiEndpoint, requestData);

    const cities: City[] = response.data.data;

    const cityDescriptions = cities.map((city: City) => city.Description);

    return cityDescriptions;
  } catch (error) {
    console.error("Помилка отримання переліку міст з API Нової пошти:", error);
    throw new Error("Помилка отримання переліку міст з API Нової пошти");
  }
};

export const getNovaPoshtaCitiesObject = async (): Promise<City[]> => {
  try {
    const apiKey = process.env.NOVAPOSHTA_API_KEY;

    const apiEndpoint = "https://api.novaposhta.ua/v2.0/json/";

    const requestData = {
      apiKey: apiKey,
      modelName: "Address",
      calledMethod: "getCities",
      methodProperties: {},
    };

    const response = await axios.post(apiEndpoint, requestData);

    const cities: City[] = response.data.data;

    return cities;
  } catch (error) {
    console.error("Помилка отримання переліку міст з API Нової пошти:", error);
    throw new Error("Помилка отримання переліку міст з API Нової пошти");
  }
};

export const getNovaPoshtaWarehouses = async (
  cityRef: string
): Promise<Warehouse[]> => {
  try {
    const apiKey = process.env.NOVAPOSHTA_API_KEY;

    const apiEndpoint = "https://api.novaposhta.ua/v2.0/json/";

    const requestData = {
      apiKey: apiKey,
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityRef: cityRef,
      },
    };

    const response = await axios.post(apiEndpoint, requestData);

    const warehouses: Warehouse[] = response.data.data;

    return warehouses;
  } catch (error) {
    console.error(
      `Помилка отримання переліку відділень для міста з Ref ${cityRef}:`,
      error
    );
    throw new Error(
      `Помилка отримання переліку відділень для міста з Ref ${cityRef}`
    );
  }
};
