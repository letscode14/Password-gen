import { useContext, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { ModeContext } from "../Context/Context";

const PrivateRoute = () => {
  const { user } = useContext(ModeContext);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export const PublicRoute = () => {
  const { user } = useContext(ModeContext);
  return user ? <Navigate to="/create" /> : <Outlet />;
};

export default PrivateRoute;
