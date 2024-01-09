import { Routes, Route } from "react-router-dom";
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

export default function Auth() {

  return (
    <div>
      <Routes >
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<RecommendedBooks />}/>
        <Route path="/fiction" element={<RecommendedBooks type={"Fiction"} />} />
        <Route path="/classic" element={<RecommendedBooks type={"Classic"} />} />
        <Route path="/adventure" element={<RecommendedBooks type={"Adventure"} />} />
        <Route path="/Comedy" element={<RecommendedBooks type={"Comedy"} />} />
        <Route path="/product/:id" element={<ProductDetailsPage/>} />
        <Route path="/details" element={<DetailsPage/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishListComp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )

}
