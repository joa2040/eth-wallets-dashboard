import { Action, Types, } from "../interfaces";

export const fetchingReducer = (state: boolean, action: Action) => {
  switch (action.type) {
    case Types.Fetching:
      return action.payload;
    default:
      return state;
  }
}
