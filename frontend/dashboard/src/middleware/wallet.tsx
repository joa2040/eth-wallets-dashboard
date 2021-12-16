import axios from "axios";
import { Wallet } from "../interfaces";

const WALLET_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL + 'wallet/';

/**
 * Returns wallets for the current user
 * @param user
 */
export const loadWallets = async (user: string | undefined): Promise<Wallet[]> => {
  const url = `${WALLET_BASE_URL}${user}`
  const { data } = await axios.get(url);
  return data;
}

/**
 * Updates wallets for the current user
 * @param wallets
 */
export const updateWallets = async (wallets: Wallet[]): Promise<void> => {
  const { data } = await axios.put(WALLET_BASE_URL, wallets);
  return data;
}

/**
 * Saves a wallet for the current user
 * @param wallet
 */
export const addWallet = async (wallet: Wallet): Promise<void> => {
  const { data } = await axios.post(WALLET_BASE_URL, wallet);
  return data;
}

/**
 * Deletes a wallet for the current user
 * @param wallet
 */
export const deleteWallet = async (wallet: Wallet): Promise<void> => {
  const { data } = await axios.delete(WALLET_BASE_URL, { data: wallet });
  return data;
}
