import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuthContext } from "../hooks/useAuthContext";
import { FaPencilAlt } from "react-icons/fa";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const { user } = useAuthContext();
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setUserDetails(json);
      }
    };

    getUser();
  }, []);

  return !userDetails ? (
    <LoadingSpinner></LoadingSpinner>
  ) : (
    <div className="user-details">
      <h4>Profile</h4>
      <ul>
        <div className="detail">
          <span>Username:</span>
          <span>
            <b>{userDetails.username}</b>
          </span>
        </div>
        <div className="detail">
          <span>Email:</span>
          <span>
            <b>{userDetails.email}</b>
          </span>
        </div>
        <p>Your personal information</p>
        <div className="detail">
          <span>Full name:</span>
          <span>
            <b>{userDetails.fullName ? userDetails.fullName : ""}</b>
          </span>
        </div>
        <div className="detail">
          <span>Address:</span>
          <span>
            <b>{userDetails.address ? userDetails.address : ""}</b>
          </span>
        </div>
        <div className="detail">
          <span>City:</span>
          <span>
            <b>{userDetails.city ? userDetails.city : ""}</b>
          </span>
        </div>
        <div className="detail">
          <span>Country:</span>
          <span>
            <b>{userDetails.country ? userDetails.country : ""}</b>
          </span>
        </div>
      </ul>
      <Link to={"/user-edit"}>
        Edit <FaPencilAlt></FaPencilAlt>
      </Link>
    </div>
  );
};

export default UserDetails;
