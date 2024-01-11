import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initializeAuth, logOut } from "../src/feature/auth/authSlice";
import Home from "./pages/Home";
import MyHabits from "./pages/MyHabits";
import WeeklyReview from "./pages/WeeklyReview";
import About from "./pages/About";
import Account from "./pages/Account";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for username in localStorage when app starts
    const username = localStorage.getItem("username");
    if (username) {
      dispatch(initializeAuth({ username }));
    }
  }, [dispatch]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-habits" element={<MyHabits />} />
          <Route path="/weekly-review" element={<WeeklyReview />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
