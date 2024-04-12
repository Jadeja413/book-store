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
import { BookDataContext } from "./Context";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "./ContextCreate";
import { toast } from "react-toastify";
import axios from "axios";

export default function Auth() {

  const [bookData, setBookData] = useState([]);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch('http://localhost:9000/books', {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    //   .then((response) => response.json())
    //   .then((json) => setBookData(json))
    //   .catch(console.error(), toast.error())
    async function Checker() {
      try {
        const bookFetchData = await axios.get('http://localhost:9000/books', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setBookData(bookFetchData?.data)
        console.log("bookFetchData", bookFetchData.data)
      } catch (error) {
        toast.error('session is expired');
        localStorage.removeItem('token');
        // navigate('/login');
        console.log("eeeeeee", error)
      }
    }
    Checker();

  }, [token]);

  return (
    <div>
      <BookDataContext.Provider value={bookData}>
        <ResponsiveAppBar />
        <Routes >
          <Route element={<ProtectedRoutes />} >
            <Route path="/" element={<Home />} />
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
            {/* <Route path="/signin" element={<SignIn />}/>
        <Route path="/signup" element={<SignUp />}/> */}
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BookDataContext.Provider>
    </div>
  )

}
