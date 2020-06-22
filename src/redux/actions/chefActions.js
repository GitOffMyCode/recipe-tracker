import * as types from "./actionTypes";
import * as chefApi from "../../api/chefApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadChefsSuccess(chefs) {
  return {
    type: types.LOAD_CHEFS_SUCCESS,
    chefs,
  };
}

// THUNK - every Thunk returns a function that accepts dispatch as an argument
export function loadChefs() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return chefApi
      .getChefs()
      .then(chefs => {
        dispatch(loadChefsSuccess(chefs));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
