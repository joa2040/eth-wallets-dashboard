import axios from "axios";
import { ExchangeRate } from "../interfaces";

const EXCHANGE_RATE_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL + 'exchange-rate/';

/**
 * Returns exchange rates for the current user
 * @param user
 */
export const loadExchangeRates = async (user: string | undefined): Promise<ExchangeRate[]> => {
  const url = `${EXCHANGE_RATE_BASE_URL}${user}`
  const {data} = await axios.get(url);
  return data;
}

/**
 * Saves exchange rates for the current user
 * @param exchangeRates
 */
export const saveExchangeRates = async (exchangeRates: ExchangeRate[]): Promise<void> => {
  const {data} = await axios.post(EXCHANGE_RATE_BASE_URL, exchangeRates);
  return data;
}
