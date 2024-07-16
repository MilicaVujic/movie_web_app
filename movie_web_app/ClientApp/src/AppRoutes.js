import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import Registration from "./components/Registration";
import Login from "./components/Login";
import UserAccount from "./components/UserAccount";
import ResetPassword from "./components/ResetPassword";

const AppRoutes = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken && window.location.pathname !== '/registration' && window.location.pathname !== '/resetpassword') {
      navigate('/', { replace: true }); 
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/account" element={<UserAccount />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
    </Routes>
  );
};

export default AppRoutes;
