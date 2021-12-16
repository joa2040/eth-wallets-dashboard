import React from "react";

export type InitialStateType = {
  wallets: Wallet[],
  rates: ExchangeRate[],
  error: boolean,
  currencies: Currency[]
}

export type InitialLoadingStateType = {
  loadingCount: number,
  errorMessage: string,
  showLoading: Function,
  hideLoading: Function,
  showError: Function,
  cleanError: Function
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
      type: Key;
    }
    : {
      type: Key;
      payload: M[Key];
    }
}

export enum Types {
  Load = "LOAD_WALLET",
  Add = "ADD_WALLET",
  Remove = "REMOVE_WALLET",
  Edit = "EDIT_WALLET",
  LoadExchangeRates = "LOAD_RATES",
  EditExchangeRate = "EDIT_EXCHANGE_RATE",
  LoadCurrencies = "LOAD_CURRENCIES",
  Error = "SET_ERROR"
}

export type WalletPayload = {
  [Types.Load]: Wallet[],
  [Types.Add]: Wallet,
  [Types.Edit]: Wallet,
  [Types.Remove]: {
    id: string;
  }
}

export type ExchangeRatePayload = {
  [Types.LoadExchangeRates]: ExchangeRate[],
  [Types.EditExchangeRate]: ExchangeRate,
}

export type CurrencyPayload = {
  [Types.LoadCurrencies]: Currency[],
}

export type ErrorPayload = {
  [Types.Error]: boolean,
}

export type WalletActions = ActionMap<WalletPayload>[keyof ActionMap<WalletPayload>];
export type ExchangeRateActions = ActionMap<ExchangeRatePayload>[keyof ActionMap<ExchangeRatePayload>];
export type CurrencyActions = ActionMap<CurrencyPayload>[keyof ActionMap<CurrencyPayload>];
export type ErrorActions = ActionMap<ErrorPayload>[keyof ActionMap<ErrorPayload>];
export type Action = WalletActions | ExchangeRateActions | ErrorActions | CurrencyActions;

export interface Wallet {
  id?: string,
  address: string,
  balance: number,
  starred?: boolean,
  isOld?: boolean,
  firstTransaction?: number
  position: number;
  user?: string
}

export interface ExchangeRate {
  currency: string,
  rate: number,
  user?: string
}

export interface Currency {
  currency: string,
}

export type Props = {
  children: React.ReactNode
}

export type ProtectedRouteProps = {
  component: React.ComponentType
}

export type WalletProps = {
  wallet: Wallet,
  defaultRate: ExchangeRate,
  index: number,
}
