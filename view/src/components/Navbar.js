import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user, dispatch } = useAuthContext();

  const handleLogout = () => {
    //removes token and data from local storage
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <h1>
            Fully<span>Stacked</span>
          </h1>
        </Link>
        <nav>
          {user ? (
            <Link to={"/"} onClick={handleLogout}>
              Log out
            </Link>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
          <Link to={"/cart"}>Cart</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
