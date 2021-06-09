import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/orders";
const db = require("../../tools/db.json");
import _ from "lodash";

export function getOrders() {
  return db.orders;
}

export function getOrdersByRegion(region) {
  return _.filter(db.orders, (order) => order.region == region);
}

export function getProducts() {
  return fetch("https://fakestoreapi.com/products")
    .then(handleResponse)
    .catch(handleError);
}
