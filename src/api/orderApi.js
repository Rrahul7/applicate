import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/orders";

export function getOrders() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getOrdersByRegion(region) {
  return fetch(baseUrl + `?region=` + region)
    .then(handleResponse)
    .catch(handleError);
}

export function getProducts() {
  return fetch("https://fakestoreapi.com/products")
    .then(handleResponse)
    .catch(handleError);
}
