import { useState, useEffect } from "react";
import { CardFormat } from "./Cards/CardFormat";

export default function RecommendedMovies() {
  const [movieData, setMovieData] = useState([])
  
  useEffect(() => {
    fetch('https://dummyapi.online/api/movies')
      .then((response) => response.json())
      .then((json) => setMovieData(json));
  }, []);

  return (
    <div style={{ margin: "10px 30px", padding: "10px 10px", display: "flex", flexWrap: "wrap"}}>
      {
        movieData.map(movie => (
          <div key={movie.id} style={{width: "33%"}}>
            <CardFormat name={movie.movie} rating={movie.rating} image={movie.image} />
          </div>
        ))
      }
    </div>
  )
}
