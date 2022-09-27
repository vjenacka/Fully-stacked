import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <h1>
            Fully<span>Stacked</span>
          </h1>
        </Link>
        <nav>
          <Link to={"/login"}>Login</Link>
          <Link to={"/cart"}>Cart</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
