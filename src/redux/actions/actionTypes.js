export const LOAD_RECIPES_SUCCESS = "LOAD_RECIPES_SUCCESS";
export const LOAD_CHEFS_SUCCESS = "LOAD_CHEFS_SUCCESS";
export const LOAD_CATEGORIES_SUCCESS = "LOAD_CATEGORIES_SUCCESS";
export const CREATE_RECIPE_SUCCESS = "CREATE_RECIPE_SUCCESS";
export const UPDATE_RECIPE_SUCCESS = "UPDATE_RECIPE_SUCCESS";
export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const API_CALL_ERROR = "API_CALL_ERROR";

// Optimistic Delete:
// By convention actions ending in "_SUCCESS" are assumed to be the result of a completed API call.
// But since we're doing an optimistic delete, we're hiding loading state.
// So this action deliberately omits the "_SUCCESS" suffix.
// If it had one our apiCallsInProgress counter would be decremented below zero because we're not incrementing the number of apiCallsinProgress when the delete request begins.

export const DELETE_RECIPE_OPTIMISTIC = "DELETE_RECIPE_OPTIMISTIC";
