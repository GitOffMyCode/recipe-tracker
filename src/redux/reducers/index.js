// root reducer - all the slices of state that can be passed to a component
import { combineReducers } from "redux";
import recipes from "./recipeReducer";
import chefs from "./chefReducer";
import categories from "./categoryReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  recipes,
  chefs,
  categories,
  apiCallsInProgress,
});

export default rootReducer;
