import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function chefReducer(state = initialState.chefs, action) {
  switch (action.type) {
    //
    case types.LOAD_CHEFS_SUCCESS:
      return action.chefs;
    //
    default:
      return state;
  }
}
