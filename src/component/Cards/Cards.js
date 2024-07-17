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
import { Box, Grid, Typography } from '@mui/material';

export default function Cards(props) {

  const { type, titleOf, onPath } = props;

  const navigate = useNavigate();
  const bookData = useContext(BookDataContext);
  const [width, setWidth] = useState(window.innerWidth);

  const filteredData = bookData.filter((item) => (item.genre).includes(type));


  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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
  const getSlidesToShow = () => {
    if (width >= 1600) {
      return filteredData?.length >= 5 ? 5 : filteredData.length;
    } else if (width >= 1400) {
      return filteredData?.length >= 4 ? 4 : filteredData.length;
    } else if (width >= 1030) {
      return filteredData?.length >= 3 ? 3 : filteredData.length;
    } else if (width >= 730) {
      return filteredData?.length >= 2 ? 2 : filteredData.length;
    } else {
      return 1;
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Grid>
      <Box margin='20px'>
        <Grid display='flex' justifyContent='space-between' alignItems="center">
          <Typography variant="p" sx={{ color: "GrayText", fontSize: "20px" }} >{titleOf}</Typography>
          <Link to={onPath} style={{ color: "#1976d2", textDecoration: "none" }}>{"view more >>"}</Link>
        </Grid>
      </Box>

      <Grid sx={{ padding: '10px 40px' }}>
        <Slider {...settings}>
          {
            filteredData.map(book => (
              <Grid key={book.id} >
                <CardFormat
                  id={book.id}
                  name={book.title}
                  description={book.description}
                  image={book.cover_image}
                  author={book.author}
                  year={book.publication_year}
                  detailProducts={filteredData.length < 5 ? false : true}
                  price={book.price}
                />
              </Grid>
            ))
          }
        </Slider>
      </Grid>
    </Grid>
  );
}
