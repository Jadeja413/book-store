import React, { Fragment, useEffect, useState } from 'react';
import { CardFormat } from "./CardFormat"
import { DisplaySettings } from '@mui/icons-material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

export default function MovieCards() {
  const [movieData, setMovieData] = useState([])
  
  useEffect(() => {
    // const response = await fetch('https://dummyapi.online/api/movies')
    // const data = await response.json();
    
    fetch('https://dummyapi.online/api/movies')
      .then((response) => response.json())
      .then((json) => setMovieData(json));
  }, [])

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style,  background: "grey" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "grey" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };


  return (
    <Fragment>
      <div style={{display: "flex", justifyContent: "space-between", margin: "10px 20px"}}>
        <p style={{color: "GrayText", fontSize: "20px"}}>Recommended Movies</p>
        <Link to="/recommended-movies" style={{color: "#1976d2", textDecoration: "none"}}>{"view more >>"}</Link>
      </div>

      <div style={{ margin: "10px 30px", padding: "10px 10px" }}>
        <Slider {...settings}>
        {/* <div style={{ display: "flex", width: "100%", overflowX: "scroll"}}> */}
          {
            movieData.map(movie => (
              <div key={movie.id} >
                <CardFormat name={movie.movie} rating={movie.rating} image={movie.image} />
              </div>
            ))
          }
        {/* </div> */}
        </Slider>
      </div>
    </Fragment>
  );
}
