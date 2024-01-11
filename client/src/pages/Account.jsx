import React from "react";
import axios from "axios";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../feature/auth/authSlice";

import { Button } from "@/components/ui/button";

function Account() {
  const user = useSelector((state) => state.auth.value);

  const dispatch = useDispatch();
  console.log(user);

  const signOut = (e) => {
    e.preventDefault();

    const baseUrl = import.meta.env.VITE_BASE_URL;
    axios
      .post(
        `${baseUrl}/api/logout`,
        {},
        {
          withCredentials: true, // Ensures cookies are sent with the request
          credentials: "include", // For cross-origin requests
        }
      )
      .then((result) => console.log("hi"))
      .then(() => dispatch(logOut()))
      .catch((err) => console.log("Logout error: ", err));
  };

  return (
    <div>
      <Header />

      <div className="content-container content-header-margin">
        {user.username && (
          <div>
            <p>
              Welcome, {user.firstName} {user.lastName}
            </p>
            <Link to={"/"}>
              <Button onClick={signOut}>Logout</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
