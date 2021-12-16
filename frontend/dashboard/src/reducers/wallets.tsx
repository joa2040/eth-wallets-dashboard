import { Action, Types, Wallet } from "../interfaces";

const walletsReducer = (state: Wallet[], action: Action) => {
  switch (action.type) {
    case Types.Load:
      return [
        ...action.payload,
      ]
    case Types.Edit:
      const index = state.findIndex(function(wallet){
        return wallet.id === action.payload.id;
      })
      return [
          ...state.slice(0, index),
          action.payload,
          ...state.slice(index+1)
      ]
    case Types.Add:
      return [
        ...state,
        action.payload,
      ]
    default:
      return state;
  }
}

export default walletsReducer;
