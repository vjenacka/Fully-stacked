import React, { useState } from "react";
import Profilenav from "./Profilenav";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user, dispatch } = useAuthContext();

  const handleLogout = () => {
    //removes token and data from local storage
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    setIsVisible(false);
    toast.info("Logged out!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      progress: undefined,
    });
  };

  const style = {
    visibility: isVisible ? "visible" : "hidden",
    opacity: isVisible ? 1 : 0,
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
              <button onClick={() => setIsVisible(!isVisible)}>Profile</button>
              <Profilenav
                style={style}
                handleLogout={handleLogout}
                user={user}
              ></Profilenav>
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
