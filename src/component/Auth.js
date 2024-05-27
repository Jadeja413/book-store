import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import { SignIn } from "./Cards/signin/SignIn";
import { SignUp } from "./Cards/signin/SignUp";
import RecommendedBooks from "./RecommendedBooks";
import Blogs from "./Blogs";
import Error from "./Error";
import ContactUs from "./ContactUs";
import DetailsPage from "./DetailsPage";
import ProductDetailsPage from "./ProductDetailsPage";
import Cart from "./Cart";
import WishListComp from "./WishListComp";
import Profile from "./Profile";
import FAQ from "./FAQ";
import ProtectedRoutes from "../ProtectedRoutes";
import ResponsiveAppBar from "./Header";
import { BookDataContext, UserDataContext } from "./Context";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "./ContextCreate";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from "./Footer";

export default function Auth() {
  const initialUserData = {
    wishlistCount: JSON.parse(localStorage.getItem('user'))?.wishlistCount || 0,
    cartlistCount: JSON.parse(localStorage.getItem('user'))?.cartlistCount || 0,
  };

  const [bookData, setBookData] = useState([]);
  const [userData, setUserData] = useState(initialUserData);

  const user = JSON.parse(localStorage.getItem('user'));
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {

    async function Checker() {
      try {
        const bookFetchData = await axios.get('http://localhost:9000/books', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setBookData(bookFetchData?.data);

      } catch (error) {
        if (error.response?.data.message === 'jwt expired') {
          toast.error('session is expired!');
          localStorage.removeItem('token');
          setToken(null);
          navigate('/login');
        } else {
          toast.error('Something went wrong!');
          console.log("eeeeeee", error);
        }
      }
    }
    Checker();

  }, [token]);

  return (
    <div>
      <UserDataContext.Provider value={{ userData, setUserData }} >
        <BookDataContext.Provider value={bookData}>
          <ResponsiveAppBar />
          <Routes >
            <Route element={<ProtectedRoutes />} >
              <Route path="/" exact element={<Home />} />
              <Route path="/products" element={<RecommendedBooks />} />
              <Route path="/fiction" element={<RecommendedBooks type={"Fiction"} />} />
              <Route path="/classic" element={<RecommendedBooks type={"Classic"} />} />
              <Route path="/adventure" element={<RecommendedBooks type={"Adventure"} />} />
              <Route path="/Comedy" element={<RecommendedBooks type={"Comedy"} />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/details" element={<DetailsPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<WishListComp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/blog" element={<Blogs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </BookDataContext.Provider>
        <Footer />
      </UserDataContext.Provider>
    </div>
  )

}
