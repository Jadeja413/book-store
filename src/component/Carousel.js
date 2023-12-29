import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function CarouselPage() {
  return (
    <Carousel
      autoPlay
      interval="3000"
      showArrows
      infiniteLoop
      showThumbs={false}
    >
      <div>
        <img style={{ width: "100%", height: "600px" }} src="/Animal.jpg" alt="Animal movie poster" />
        <p className="legend">Animal</p>
      </div>
      <div>
        <img style={{ width: "100%", height: "600px" }} src="SamBahadur.jpg" alt="SamBahadur movie poster"/>
        <p className="legend">SamBahadur</p>
      </div>
      <div>
        <img style={{ width: "100%", height: "600px" }} src="Salaar.jpg" alt="Salaar movie poster"/>
        <p className="legend">Salaar</p>
      </div>
    </Carousel>
  )
} 
