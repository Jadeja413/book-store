import { Routes, Route, Navigate } from "react-router-dom";
import { SignIn } from "./Cards/signin/SignIn";
import { SignUp } from "./Cards/signin/SignUp";
import Error from "./Error";

export default function UnAuth() {

  return (
    <div>
      <Routes >
        <Route path="/login" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp />}/>
        {/* <Route path="*" element={<Error />} /> */}
        <Route path='*' element={<Navigate to="/login" />} />
      </Routes>
    </div>
  )

}
