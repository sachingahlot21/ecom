export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';

export const searchProducts = (query) => ({
  type: SEARCH_PRODUCTS,
  payload: query,
});