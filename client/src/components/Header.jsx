import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

function Header() {
  const [activeTab, setActiveTab] = useState(null);
  const location = useLocation();

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

  return (
    <nav className="shadow-xl top-0 fixed z-50 text-text bg-background flex flex-row justify-between items-center px-8 w-full">
      {/* <nav className="z-50 w-full absolute top-0 bg-background flex flex-row justify-between items-center px-8"> */}
      <Link to="/" className="text-2xl">
        Habit Forge
      </Link>
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
    </nav>
  );
}

export default Header;
