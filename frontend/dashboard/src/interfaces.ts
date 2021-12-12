import React from "react";

export type InitialStateType = {
  wallets: Wallet[],
  rates: ExchangeRate[]
  isFetching: boolean
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
  Fetching = "IS_FETCHING"
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

export type FetchingPayload = {
  [Types.Fetching]: boolean,
}

export type WalletActions = ActionMap<WalletPayload>[keyof ActionMap<WalletPayload>];
export type ExchangeRateActions = ActionMap<ExchangeRatePayload>[keyof ActionMap<ExchangeRatePayload>];
export type FetchingActions = ActionMap<FetchingPayload>[keyof ActionMap<FetchingPayload>];
export type Action = WalletActions | ExchangeRateActions | FetchingActions;

export interface Wallet {
  id: string,
  address: string,
  balance: number,
  starred?: boolean
}

export interface ExchangeRate {
  id: string,
  currency: string,
  rate: number
}

export type Props = {
  children: React.ReactNode
}

export type ProtectedRouteProps = {
  component: React.ComponentType
}

export type WalletProps = {
  wallet: Wallet,
  index: number,
}
