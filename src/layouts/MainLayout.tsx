import CattegoryNavigation from "./components/cattegory-navigation/CattegoryNavigation";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";

function MainLayouts() {
  return (
    <>
      <Header />
      <CattegoryNavigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayouts;
