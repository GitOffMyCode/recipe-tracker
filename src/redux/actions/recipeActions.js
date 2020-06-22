import * as types from "./actionTypes";
import * as recipeApi from "../../api/recipeApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadRecipesSuccess(recipes) {
  return {
    type: types.LOAD_RECIPES_SUCCESS,
    recipes,
  };
}

export function updateRecipeSuccess(recipe) {
  return {
    type: types.UPDATE_RECIPE_SUCCESS,
    recipe,
  };
}

export function createRecipeSuccess(recipe) {
  return {
    type: types.CREATE_RECIPE_SUCCESS,
    recipe,
  };
}

export function deleteRecipeOptimistic(recipe) {
  return {
    type: types.DELETE_RECIPE_OPTIMISTIC,
    recipe,
  };
}

// THUNK - every Thunk returns a function that accepts dispatch as an argument
export function loadRecipes() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return recipeApi
      .getRecipes() // - ASYNC - getRecipes in recipeApi
      .then(recipes => {
        dispatch(loadRecipesSuccess(recipes));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

// THUNK
export function saveRecipe(recipe) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return recipeApi
      .saveRecipe(recipe) // ASYNC - saveRecipe in recipeApi
      .then(savedRecipe => {
        recipe.id
          ? dispatch(updateRecipeSuccess(savedRecipe)) // PUT
          : dispatch(createRecipeSuccess(savedRecipe)); // POST
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

// THUNK
export function deleteRecipe(recipe) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteRecipeOptimistic(recipe));
    return recipeApi.deleteRecipe(recipe.id);
  };
}
