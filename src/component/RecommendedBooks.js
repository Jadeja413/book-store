import { useState, useEffect, Fragment, useContext } from "react";
import { CardFormat } from "./Cards/CardFormat";
import { Grid, Typography } from "@mui/material";
import { BookDataContext } from "./Context";

export default function RecommendedBooks({ type }) {

  // const [movieData, setMovieData] = useState([]);

  const bookData = useContext(BookDataContext);

  const filteredData = type ? bookData.filter((item) => (item.genre).includes(type)) : bookData;

  // useEffect(() => {
  //   fetch('https://freetestapi.com/api/v1/books')
  //     .then((response) => response.json())
  //     .then((json) => setMovieData(json));
  // }, []);

  return (
    <Fragment>
      <div>
        <Typography variant="h3" sx={{ margin: "20px 30px" }}>{type || "All"} Books</Typography>
      </div>
      {/* <div style={{ margin: "10px 30px", padding: "10px 10px", display: "flex", flexWrap: "wrap" }}> */}
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        {
          filteredData.map(book => (
            // <div key={book.id} style={{width: "33%"}}>
            <Grid key={book.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <CardFormat
                id={book.id}
                name={book.title}
                description={book.description}
                author={book.author}
                image={book.cover_image}
                year={book.publication_year} />
              {/* </div> */}
            </Grid>
          ))
        }
      </Grid>
      {/* </div> */}
    </Fragment>
  )
}
