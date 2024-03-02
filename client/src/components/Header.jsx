import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const [activeTab, setActiveTab] = useState(null);
  const location = useLocation();

  const user = useSelector((state) => state.auth.value);

  // console.log("header:", user);
  const headerRoutes = [
    {
      name: "My Habits",
      to: "/my-habits",
    },
    {
      name: "Weekly Review",
      to: "/weekly-review",
    },
    { name: "About", to: "/about" },

    { name: "Account", to: "/account" },
  ];

  const handleClick = (route) => {
    setActiveTab(route);
  };

  useEffect(() => {
    // Update the activeTab based on the current pathname
    // location.pathname = the current URL
    const currentRoute = headerRoutes.find(
      (route) => route.to === location.pathname
    );
    // console.log("Location.pathname: ", location.pathname);
    if (currentRoute) {
      setActiveTab(currentRoute.name);
    }
  }, [location]);

  // console.log(user);

  return (
    <nav className="shadow-xl top-0 fixed z-50 text-text bg-background flex flex-row justify-between items-center px-8 w-full min-w-800">
      <Link to="/" className="text-2xl px-3">
        {/* <Link to="/" className="text-2xl px-3 py-3"> */}
        Habit Forge
      </Link>
      {user.username ? (
        <div>
          <ul className="list-none flex flex-row gap-x-5 hover:cursor-pointer">
            {headerRoutes.map((route) => {
              return (
                <li key={route.name}>
                  <Link
                    to={route.to}
                    className={`flex items-center px-3 py-3 ${
                      activeTab === route.name ? "bg-secondary" : ""
                    }`}
                    onClick={() => handleClick(route.name)}
                  >
                    {route.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <Link to={"/login"} className="px-3 py-3">
          Login
        </Link>
      )}
    </nav>
  );
}

export default Header;
