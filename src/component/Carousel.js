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
        <img style={{ width: "100%", height: "600px" }} src="https://www.frontlist.in/storage/uploads/2021/06/GettyImages-577674005.jpg" alt="Book shelf" />
        {/* <p className="legend">Animal</p> */}
      </div>
      <div>
        <img style={{ width: "100%", height: "600px" }} src="https://www.realsimple.com/thmb/HdIvvCebdu79KMtJjulM2gxalXQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/great-books-for-anytime-2000-4ff4221eb1e54b659689fef7d5e265d5.jpg" alt="SamBahadur movie poster"/>
        <p className="legend">Books On Rent</p>
      </div>
      <div>
        <img style={{ width: "100%", height: "600px" }} src="https://images.ctfassets.net/cnu0m8re1exe/4KwrJVfCGeyOKwm8PS2tjI/30026753d97e3b41a50560063126ded8/shutterstock_135114548.jpg?fm=jpg&fl=progressive&w=660&h=433&fit=fill" alt="Epic Books"/>
        <p className="legend">Epic Books</p>
      </div>
    </Carousel>
  )
} 
