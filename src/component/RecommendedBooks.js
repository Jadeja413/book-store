import { useState, useEffect, Fragment, useContext } from "react";
import { CardFormat } from "./Cards/CardFormat";
import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { BookDataContext } from "./Context";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { TokenContext } from "./ContextCreate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RecommendedBooks({ type }) {

  const [searchQuery, setSearchQuery] = useState('');

  // const bookData = useContext(BookDataContext);

  const [bookData, setBookData] = useState([]);
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {

    let url = 'http://localhost:9000/books';
    // if (searchQuery) {
    //   url += `?title=${encodeURIComponent(searchQuery)}&price=100`;
    // }

    async function getBook() {
      try {
        const response = await axios.get(url,
          {
            params: { title: searchQuery, price: 100 },
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setBookData(response?.data);
      } catch (error) {
        if (error.response?.data.message === 'jwt expired') {
          toast.error('Session Expired.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500
          })
          localStorage.clear();
          setToken(null);
          navigate('/login');
        } else {
          console.error(error);
        }
      }
    }

    getBook();
  }, [searchQuery]);

  const filteredData = type ? bookData.filter((item) => (item.genre).includes(type)) : bookData;

  const searchHandler = (e) => {
    setSearchQuery(e.target.value);
  }
  return (
    <Fragment>
      <div>
        <Typography variant="h3" sx={{ margin: "20px 30px" }}>{type || "All"} Books</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: 'center', margin: '10px 40px' }}>
        <TextField
          sx={{ width: '70%', padding: '10px 15px', border: '1px solid #D3D3D3', borderRadius: '30px' }}
          id="searchBar"
          placeholder="Search"
          variant="standard"
          value={searchQuery}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              searchQuery ?
                <CloseIcon color="disabled" sx={{ cursor: 'pointer' }}
                  onClick={() => setSearchQuery('')}
                /> :
                <SearchOutlinedIcon color="disabled" />
            )
          }}
          onChange={searchHandler}
        />
      </div>

      <Grid container sx={{ padding: "20px", margin: '10px' }}>
        {
          filteredData.map(book => (
            <Grid key={book.id} item xs={12} sm={6} md={4} lg={3} xl={2} >
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
