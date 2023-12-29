import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import { SignIn } from "./Cards/signin/SignIn";
import { SignUp } from "./Cards/signin/SignUp";
import RecommendedMovies from "./RecommendedMovies";

export default function Auth() {
  return (
    <div>
      <Routes >
        <Route path="/" element={<Home/>}/>
        <Route path="/recommended-movies" element={<RecommendedMovies/>}/>
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/signup" element={<SignUp />}/>
      </Routes>
    </div>
  )

}
