import CarouselPage from "./Carousel";
import OfferCard from "./OfferCard";
import Cards from "./Cards/Cards";

export default function Home() {
  return (
    <div>
      <CarouselPage />
      <OfferCard />
      <Cards type={"Fiction"} onPath={"/fiction"} titleOf={"Fictional Books"} />
      <Cards type={"Classic"} onPath={"/classic"} titleOf={"Classical Books"} />
      <Cards type={"Adventure"} onPath={"/adventure"} titleOf={"Adventure Books"} />
      {/* <Cards type={"Comedy"} onPath={"/Comedy"} titleOf={"Comedy Books"} /> */}
    </div>
  )
}
