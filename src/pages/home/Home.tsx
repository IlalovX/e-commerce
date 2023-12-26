import MiniCards from "./components/mini-cards/MiniCards";
import Offers from "./components/offers/Offers";
import Products from "./components/products/Products";
import Swipper from "./components/swipper/Swipper";

function Home() {
  return (
    <>
      <Swipper />
      <MiniCards />
      <Offers />
      <Products />
    </>
  );
}

export default Home;
