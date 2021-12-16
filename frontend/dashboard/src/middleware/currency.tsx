import axios from "axios";
import { Currency } from "../interfaces";

const CURRENCY_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL + 'currency/';

/**
 * Returns currencies
 */
export const loadCurrencies = async (): Promise<Currency[]> => {
  const { data } = await axios.get(CURRENCY_BASE_URL);
  return data;
}
