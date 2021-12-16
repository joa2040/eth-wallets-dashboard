import axios from "axios";
import { Wallet } from "../interfaces";

const WALLET_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL + 'wallet/';

/**
 * Returns wallets for the current user
 * @param user
 * @param token
 */
export const loadWallets = async (user: string | undefined, token: string): Promise<Wallet[]> => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const url = `${WALLET_BASE_URL}${user}`
  const { data } = await axios.get(url, config);
  return data;
}

/**
 * Updates wallets for the current user
 * @param wallets
 * @param token
 */
export const updateWallets = async (wallets: Wallet[], token: string): Promise<void> => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const { data } = await axios.put(WALLET_BASE_URL, wallets, config);
  return data;
}

/**
 * Saves a wallet for the current user
 * @param wallet
 * @param token
 */
export const addWallet = async (wallet: Wallet, token: string): Promise<void> => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const { data } = await axios.post(WALLET_BASE_URL, wallet, config);
  return data;
}

/**
 * Deletes a wallet for the current user
 * @param wallet
 * @param token
 */
export const deleteWallet = async (wallet: Wallet, token: string): Promise<void> => {
  const { data } = await axios.delete(WALLET_BASE_URL, { data: wallet, headers: { Authorization: token } });
  return data;
}
