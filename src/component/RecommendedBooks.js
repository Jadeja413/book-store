import { useState, useEffect, Fragment, useContext } from "react";
import { CardFormat } from "./Cards/CardFormat";
import { Grid, Typography } from "@mui/material";
import { BookDataContext } from "./Context";

export default function RecommendedBooks({ type }) {

  const bookData = useContext(BookDataContext);

  const filteredData = type ? bookData.filter((item) => (item.genre).includes(type)) : bookData;

  return (
    <Fragment>
      <div>
        <Typography variant="h3" sx={{ margin: "20px 30px" }}>{type || "All"} Books</Typography>
      </div>
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        {
          filteredData.map(book => (
            <Grid key={book.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <CardFormat
                id={book.id}
                name={book.title}
                description={book.description}
                author={book.author}
                image={book.cover_image}
                year={book.publication_year} />
            </Grid>
          ))
        }
      </Grid>
    </Fragment>
  )
}
