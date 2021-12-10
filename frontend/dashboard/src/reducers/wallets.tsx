import { Wallet, WalletActions } from "../interfaces";

const walletsReducer = (state: Wallet[], action: WalletActions) => {
  switch (action.type) {
    case 'LOAD_WALLET':
      return [
        ...action.payload
      ]
    case 'EDIT_WALLET':
      const index = state.findIndex(function(wallet){
        return wallet.id === action.payload.id;
      })
      return [
          ...state.slice(0, index),
          action.payload,
          ...state.slice(index+1)
      ]
    case 'ADD_WALLET':
      return [
        ...state,
        action.payload,
      ]
    case 'REMOVE_WALLET':
      return [
        ...state.filter(wallet => wallet.id !== action.payload.id),
      ]
    default:
      return state;
  }
}

export default walletsReducer;
