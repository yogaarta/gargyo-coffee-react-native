import { addProductString, clearCartString } from "./actionString";


export const addProductAction = (product) => ({
  type: addProductString,
  payload: product
})

export const clearCartAction = () => ({
  type: clearCartString,
})