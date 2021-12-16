import { Action, ExchangeRate, Types } from "../interfaces";

const exchangeRateReducer = (state: ExchangeRate[], action: Action) => {
  switch (action.type) {
    case Types.LoadExchangeRates:
      return [
        ...action.payload,
      ]
    case Types.EditExchangeRate:
      const index = state.findIndex(function(er){
        return er.currency === action.payload.currency;
      })
      return [
        ...state.slice(0, index),
        action.payload,
        ...state.slice(index+1)
      ]
    default:
      return state;
  }
}

export default exchangeRateReducer;
