import { useState, useEffect, Fragment, useContext } from "react";
import { CardFormat } from "./Cards/CardFormat";
import { Box, Button, Grid, Pagination, Slider, TextField, Typography } from "@mui/material";
import { BookDataContext } from "./Context";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { TokenContext } from "./ContextCreate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TuneIcon from '@mui/icons-material/Tune';
import ReactLoading from "react-loading";

export default function RecommendedBooks({ type }) {
  const [searchQuery, setSearchQuery] = useState('');

  // const bookData = useContext(BookDataContext);

  const [bookData, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showFilter, setShowFilter] = useState(false);
  const [filterBtn, setFilterBtn] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const itemsPerPage = 12;

  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  const [val, setVal] = useState([1, 1000])
  const [sliderValue, setSliderValue] = useState(val);

  let url = 'http://localhost:9000/books';

  async function getBook( params = {}) {
    try {
      const response = await axios.get(url,
        {
          params: { title: searchQuery, minPrice: params.minPrice ?? sliderValue?.[0], maxPrice: params.maxPrice ?? sliderValue?.[1] },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setVal([response.data.price.min, response.data.price.max])
      
      setBookData(response?.data.data);
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

  useEffect(() => {
    // let url = 'http://localhost:9000/books';
    // if (searchQuery) {
    //   url += `?title=${encodeURIComponent(searchQuery)}&price=100`;
    // }
    getBook();
  }, [searchQuery]);

  const filteredData = type ? bookData.filter((item) => (item.genre).includes(type)) : bookData;

  const indexOfLastItem = curPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData?.slice(indexOfFirstItem, indexOfLastItem);
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

  function valuetext(value) {
    return `₹: ${value}`;
  }

  function sliderHandler(e) {
    setSliderValue(e.target.value);
    setFilterBtn(false);
  }

  function filterApplyHandler() {
    getBook();
    setFilterBtn(true)
  }

  function filterRemover() {
    setSliderValue(val);
    getBook({minPrice: val[0], maxPrice: val[1]});
    setFilterBtn(false);
    setShowFilter(false);
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

        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Typography
            variant="subtitle1"
            display="flex"
            sx={{
              cursor: "pointer", marginLeft: "10px", marginRight: "20px",
              //  border: '1px solid gray', borderRadius: '10px', 
              padding: '5px', width: '70px', justifyContent: "space-between", color: "#1976d2"
            }}
            onClick={() => {setShowFilter(!showFilter); setSliderValue(val)}}
            gutterBottom
          >filters <TuneIcon /></Typography>
        </Box>

        {showFilter &&
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ marginLeft: '30px', width: '500px', alignItems: 'center' }}>
              <Typography variant="div">Price</Typography>
              <Slider
                // disableSwap
                key={val}
                min={1}
                max={1000}
                value={sliderValue}
                onChange={sliderHandler}
                valueLabelDisplay="auto"
                valueLabelFormat={valuetext}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="div" sx={{ padding: "2px 10px" }}>Min: {sliderValue[0]}</Typography>
                <Typography variant="div" sx={{ padding: "2px 10px" }}>Max: {sliderValue[1]}</Typography>
              </Box>
            </Box>
            <Box sx={{ marginTop: '25px', marginLeft: '50px' }}>
              <Button
                disabled={filterBtn}
                variant="contained"
                sx={{ marginRight: '10px' }}
                onClick={filterApplyHandler}>
                Apply
              </Button>

              {filterBtn && <Button
                variant="outlined"
                onClick={filterRemover}>
                Clear
              </Button>}
            </Box>
          </Box>
        }

        <Grid container mt={6}>
          {currentData.length > 0 ?
            currentData?.map(book => (
              <Grid key={book.id} sx={{ marginTop: '20px', marginBottom: '20px' }} item xs={12} sm={6} md={4} lg={3} xl={2} >
                <CardFormat
                  id={book.id}
                  name={book.title}
                  description={book.description}
                  author={book.author}
                  image={book.cover_image}
                  year={book.publication_year}
                  detailProducts={true}
                  price={book.price}
                />
              </Grid>
            ))
            :
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
              <Typography variant="div" > No data found!</Typography>
            </Box>
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
