export const getRouteMain = () => {
  return "/";
};
export const getRouteCart = () => {
  return "/cart";
};
export const getRouteFavorites = () => {
  return "/favorites";
};
export const getAllProducts = () => {
  return "/all-products";
};
export const getRouteDetail = (id: string) => {
  if (id) {
    return `/item/${id}`;
  }
  return "/item/:itemId";
};
export const getRouteOrders = () => {
  return "/orders";
};
export const getRouteSubCategory = (
  categoryId: string,
  subCategoryId: string
) => {
  if (categoryId && subCategoryId) {
    return `/${categoryId}/${subCategoryId}`;
  }
  return "/:categoryId/:subCategoryId";
};
