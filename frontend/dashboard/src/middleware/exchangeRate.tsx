import axios from "axios";
import { ExchangeRate } from "../interfaces";

const EXCHANGE_RATE_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL + 'exchange-rate/';

/**
 * Returns exchange rates for the current user
 * @param user
 * @param token
 */
export const loadExchangeRates = async (user: string | undefined, token: string): Promise<ExchangeRate[]> => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const url = `${EXCHANGE_RATE_BASE_URL}${user}`
  const { data } = await axios.get(url, config);
  return data;
}

/**
 * Saves exchange rates for the current user
 * @param exchangeRates
 * @param token
 */
export const saveExchangeRates = async (exchangeRates: ExchangeRate[], token: string): Promise<void> => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const { data } = await axios.post(EXCHANGE_RATE_BASE_URL, exchangeRates, config);
  return data;
}
