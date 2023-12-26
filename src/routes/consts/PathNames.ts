import { PathEnums } from "../enums/PathEnums";
import {
  getAllProducts,
  getRouteCart,
  getRouteDetail,
  getRouteFavorites,
  getRouteMain,
  getRouteOrders,
  getRouteSubCategory,
} from "../getPaths/getPaths";

export const PathNames: Record<PathEnums, string> = {
  [PathEnums.MAIN]: getRouteMain(),
  [PathEnums.CART]: getRouteCart(),
  [PathEnums.FAVORITES]: getRouteFavorites(),
  [PathEnums.ITEM]: getRouteDetail(""),
  [PathEnums.ORDERS]: getRouteOrders(),
  [PathEnums.SUBCARDS]: getRouteSubCategory("", ""),
  [PathEnums.ALL_PRODUCTS]: getAllProducts(),
};
