import React from "react";
import { Link } from "react-router-dom";

const Profilenav = ({ handleLogout, user, style }) => {
  return (
    <div className="profile-nav" style={style}>
      <div>
        <span>{user.email}</span>
        <span>{user.username}</span>
      </div>
      <Link to={"/profile"}>Profile</Link>
      <Link to={"orders"}>Orders</Link>
      <Link to={"/"} onClick={handleLogout}>
        Log out
      </Link>
    </div>
  );
};

export default Profilenav;
