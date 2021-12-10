import React, { ReactElement } from "react";

export type InitialStateType = {
  wallets: Wallet[];
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
};

export enum Types {
  Load = "LOAD_WALLET",
  Add = "ADD_WALLET",
  Remove = "REMOVE_WALLET",
  Edit = "EDIT_WALLET"
}

export type WalletPayload = {
  [Types.Load]: Wallet[],
  [Types.Add]: Wallet,
  [Types.Edit]: Wallet,
  [Types.Remove]: {
    id: string;
  }
}

export type WalletActions = ActionMap<WalletPayload>[keyof ActionMap<WalletPayload>];

export interface Props {
  children: React.ReactNode
}

export interface ProtectedRouteProps {
  component: React.ComponentType
}

export interface Wallet {
  id: string,
  address: string,
  balance: number,
  starred?: boolean
}

export interface WalletProps {
  wallet: Wallet,
  index: number
}

export interface ButtonProps {
  onClick: Function,
  className?: string,
  label: string | ReactElement<any>
}
