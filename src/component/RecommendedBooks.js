import { useState, useEffect, Fragment, useContext } from "react";
import { CardFormat } from "./Cards/CardFormat";
import { Grid, InputAdornment, Pagination, TextField, Typography } from "@mui/material";
import { BookDataContext } from "./Context";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { TokenContext } from "./ContextCreate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

export default function RecommendedBooks({ type }) {

  const [searchQuery, setSearchQuery] = useState('');

  // const bookData = useContext(BookDataContext);

  const [bookData, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [curPage, setCurPage] = useState(1);
  const itemsPerPage = 12;

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
        setIsLoading(true);
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

  //calculate paginated Data:
  const indexOfLastItem = curPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const numbersOfPagination = Math.ceil(filteredData.length / itemsPerPage);

  const searchHandler = (e) => {
    setSearchQuery(e.target.value);
    setCurPage(1);
  }

  const handlePageChange = (event, value) => {
    setCurPage(value);
  }

  if (!isLoading) {
    return <div style={{ minHeight: "81vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <ReactLoading type={"spin"} color={"black"} height={60} width={60} />
    </div>;
  }
  return (
    <Fragment>

      <div style={{ minHeight: '80vh' }}>
        <Typography variant="h3" sx={{ margin: "20px 30px" }}>{type || "All"} Books</Typography>

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
            currentData.map(book => (
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
        <Grid display='flex' justifyContent='center' alignItems='center' pb={4}>
          {
            (numbersOfPagination > 0) &&
            <Pagination
              variant="outlined" 
              color="primary"
              count={numbersOfPagination}
              page={curPage}
              onChange={handlePageChange}
            />
          }
        </Grid>
      </div>
    </Fragment>
  )
}
