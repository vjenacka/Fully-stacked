import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user, dispatch } = useAuthContext();

  const handleLogout = () => {
    //removes token and data from local storage
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    toast.info("Logged out!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      progress: undefined,
    });
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
            <>
              <Link to={"/"} onClick={handleLogout}>
                Log out
              </Link>
              <Link to={"/cart"}>Cart</Link>
            </>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
