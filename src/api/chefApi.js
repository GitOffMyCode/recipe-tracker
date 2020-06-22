import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/chefs/";

export function getChefs() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
