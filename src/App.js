import { useState, useEffect } from 'react';
import './App.css';
import ResponsiveAppBar from './component/Header';
import Auth from './component/Auth';
import { BookDataContext, StorageContext } from './component/Context';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from 'react-router-dom';

function App() {

  const [bookData, setBookData] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://freetestapi.com/api/v1/books')
      .then((response) => response.json())
      .then((json) => setBookData(json));
  }, []);

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [wishList]);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);


  return (
    <div className="App">
      <StorageContext.Provider value={{ wishList, setWishList, setCartList, cartList }}>
        <div>
          <ResponsiveAppBar />
        </div>

        <div>
          <BookDataContext.Provider value={bookData}>
            <Auth />
          </BookDataContext.Provider>
        </div>

        <div >
          {/* <Footer /> */}
          <ToastContainer />
        </div>

      </StorageContext.Provider>


      {/* <div style={{position: "sticky", top: "0px", right: "0px"}}>
        <Tooltip title="Need Help?">
        <InsertCommentTwoToneIcon sx={{fontSize: "80px"}}/>
        </Tooltip>
      </div> */}

    </div>
  );
}

export default App;
