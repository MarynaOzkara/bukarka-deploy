import axios from "axios";

interface City {
  Description: string;
  Ref: string;
}

export const getNovaPoshtaCities = async (): Promise<string[]> => {
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

    // console.log(response);
    const cities: City[] = response.data.data;

    const cityDescriptions = cities.map((city: City) => city.Description);

    return cityDescriptions;
  } catch (error) {
    console.error("Помилка отримання переліку міст з API Нової пошти:", error);
    throw new Error("Помилка отримання переліку міст з API Нової пошти");
  }
};
