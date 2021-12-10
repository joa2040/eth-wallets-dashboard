import React, { createContext, useReducer } from 'react';
import { InitialStateType, WalletActions } from "./interfaces";
import { walletsReducer } from "./reducers";

const initialState: InitialStateType = {
  wallets: [],
}

const AppContext = createContext<{ state: InitialStateType; dispatch: React.Dispatch<any>; }>({
  state: initialState,
  dispatch: () => null
});

const mainReducer = ({ wallets }: InitialStateType, action: WalletActions) => ({
  wallets: walletsReducer(wallets, action)
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider };
