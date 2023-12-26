import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PathNames } from "./consts/PathNames";
import { PathEnums } from "./enums/PathEnums";

const Home = lazy(() => import("../pages/home/Home"));
const SubCards = lazy(() => import("../pages/sub-сards/SubCards"));
const Item = lazy(() => import("../pages/detail/Detail"));
const Cart = lazy(() => import("../pages/cart/Cart"));
const Favorites = lazy(() => import("../pages/favorites/Favorites"));
const Orders = lazy(() => import("../pages/orders/Orders"));
const AllProducts = lazy(() => import("../pages/all-products/AllProducts"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));

function PathRoutes() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />} path={PathNames[PathEnums.MAIN]}>
          <Route
            index
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          />
          <Route
            path={PathNames[PathEnums.SUBCARDS]}
            element={
              <Suspense>
                <SubCards />
              </Suspense>
            }
          />
          <Route
            path={PathNames[PathEnums.ALL_PRODUCTS]}
            element={
              <Suspense>
                <AllProducts />
              </Suspense>
            }
          />
          <Route
            path={PathNames[PathEnums.ITEM]}
            element={
              <Suspense>
                <Item />
              </Suspense>
            }
          />
          <Route
            path={PathNames[PathEnums.CART]}
            element={
              <Suspense>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path={PathNames[PathEnums.FAVORITES]}
            element={
              <Suspense>
                <Favorites />
              </Suspense>
            }
          />
          <Route
            path={PathNames[PathEnums.ORDERS]}
            element={
              <Suspense>
                <Orders />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default PathRoutes;
