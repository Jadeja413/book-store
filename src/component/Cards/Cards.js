import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CardFormat } from "./CardFormat"
import { DisplaySettings } from '@mui/icons-material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { BookDataContext } from '../Context';

export default function Cards(props) {

  const { type, titleOf, onPath } = props;
  // const [movieData, setMovieData] = useState([]);

  const navigate = useNavigate();
  const bookData = useContext(BookDataContext);

  const filteredData = bookData.filter((item) => (item.genre).includes(type));

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      // <div
      //   className={className}
      //   style={{ ...style,  background: "grey" }}
      //   onClick={onClick}
      // />
      <div><NavigateNextIcon className={className} style={{ ...style, color: "black" }} onClick={onClick} /></div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      // <div
      //   className={className}
      //   style={{ ...style, display: "block", background: "none", color: "black" }}
      //   onClick={onClick}
      // />
      <div><NavigateBeforeIcon className={className} style={{ ...style, color: "black" }} onClick={onClick} /></div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: filteredData.length > 5 ? 5 : filteredData.length,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };


  return (
    <Fragment>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px 20px" }}>
        <div>
          <p style={{ color: "GrayText", fontSize: "20px" }}>{titleOf}</p>
        </div>
        <div>
          <Link to={onPath} style={{ color: "#1976d2", textDecoration: "none" }}>{"view more >>"}</Link>
        </div>
      </div>

      <div style={{ margin: "10px 30px", padding: "10px 10px" }}>
        <Slider {...settings}>
          {
            filteredData.map(book => (
              <div key={book.id} style={{ width: "20%" }}>
                <CardFormat
                  id={book.id}
                  name={book.title}
                  description={book.description}
                  image={book.cover_image}
                  author={book.author}
                  year={book.publication_year}
                />
              </div>
            ))
          }
        </Slider>
      </div>
    </Fragment>
  );
}
