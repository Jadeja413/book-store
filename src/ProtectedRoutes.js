import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import {TokenContext} from "./component/ContextCreate";

const ProtectedRoutes = () => {
  const { token } = useContext(TokenContext);
  // const isAuthenticated = localStorage.getItem('token');
  // console.log("localStorage", localStorage.getItem('token'))

  return (
    <>
      {token ? <Outlet /> : <Navigate to='/login' />}
      {/* {isAuthenticated ? <Outlet /> : <Navigate to='/login' />} */}
    </>
  )
}

export default ProtectedRoutes;
