import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function ReactSlick() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return (
        <div style={{width: "100%"}}>
        <Slider {...settings}>
        <div>
            <img style={{width: "100%", height: "600px"}} src="/Animal.jpg" alt="Animal movie poster"/>
            <p className="legend">Animal</p>
        </div>
        <div>
            <img style={{width: "100%", height: "600px"}} src="SamBahadur.jpg" />
            <p className="legend">SamBahadur</p>
        </div>
        <div>
            <img style={{width: "100%", height: "600px"}} src="Salaar.jpg" />
            <p className="legend">Salaar</p>
        </div>
        </Slider>
        </div>
    )
} 
