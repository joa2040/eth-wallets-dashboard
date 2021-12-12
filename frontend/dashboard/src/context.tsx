import React, { createContext, useReducer } from 'react';
import { Action, InitialStateType } from "./interfaces";
import { walletsReducer } from "./reducers";
import { fetchingReducer } from "./reducers/fetching";
import exchangeRateReducer from "./reducers/exchangeRates";

const initialState: InitialStateType = {
  wallets: [],
  rates: [],
  isFetching: false,
}

const AppContext = createContext<{ state: InitialStateType; dispatch: React.Dispatch<any>; }>({
  state: initialState,
  dispatch: () => null
});

const mainReducer = ({ wallets, rates, isFetching }: InitialStateType, action: Action) => ({
  wallets: walletsReducer(wallets, action),
  rates: exchangeRateReducer(rates, action),
  isFetching: fetchingReducer(isFetching, action)
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
