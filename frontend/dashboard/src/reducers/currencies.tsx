import { Action, Currency, Types } from "../interfaces";

const currenciesReducer = (state: Currency[], action: Action) => {
  switch (action.type) {
    case Types.LoadCurrencies:
      return [
        ...action.payload,
      ]
    default:
      return state;
  }
}

export default currenciesReducer;
