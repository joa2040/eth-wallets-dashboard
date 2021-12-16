import axios from "axios";
import { Currency } from "../interfaces";

const CURRENCY_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL + 'currency/';

/**
 * Returns currencies
 * @param token
 */
export const loadCurrencies = async (token: string): Promise<Currency[]> => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const { data } = await axios.get(CURRENCY_BASE_URL, config);
  return data;
}
