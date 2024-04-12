import { useState, useEffect } from 'react';
import './App.css';
import ResponsiveAppBar from './component/Header';
import Auth from './component/Auth';
import { BookDataContext, StorageContext } from './component/Context';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from 'react-router-dom';
// import Example from './Example';
// import Example1 from './Example1';
import UnAuth from './component/UnAuth';
import { createContext } from 'react';
// import {Footer} from './component/Footer'
import { TokenContext } from './component/ContextCreate';

function App() {

  // const [bookData, setBookData] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [cartList, setCartList] = useState([]);

  const [token, setToken] = useState(localStorage.getItem('token'));

  // const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
    else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // useEffect(() => {
  //   fetch('http://localhost:9000/books', {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //     .then((response) => response.json())
  //     .then((json) => setBookData(json))
  //     .catch (console.error())
  // }, [token]);

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [wishList]);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <StorageContext.Provider value={{ wishList, setWishList, setCartList, cartList }}>

        {/* <Example />
        <Example1 /> */}
        <div>
          {/* <ResponsiveAppBar /> */}
        </div>

        <div>
          {/* <BookDataContext.Provider value={bookData}> */}
            <TokenContext.Provider value={{ setToken, token }}>
              {token ? <Auth /> : <UnAuth />}
            </TokenContext.Provider>
          {/* </BookDataContext.Provider> */}
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
