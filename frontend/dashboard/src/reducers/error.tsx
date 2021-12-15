import { Action, Types, } from "../interfaces";

export const errorReducer = (state: boolean, action: Action) => {
  switch (action.type) {
    case Types.Error:
      return action.payload;
    default:
      return state;
  }
}
