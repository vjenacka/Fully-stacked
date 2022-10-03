import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";
import getUser from "../utils/getUser";

const ProfileInfo = ({}) => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfoFetch = async () => {
      const json = await getUser(user.token);

      setFullName(json.fullName);
      setAddress(json.address);
      setCity(json.city);
      setCountry(json.country);
    };

    userInfoFetch();
  }, [user.token]);

  const handleSaveInfo = async e => {
    e.preventDefault();
    const response = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ fullName, address, city, country }),
    });

    if (response.ok) {
      toast.success("Personal information updated!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined,
      });
      navigate(-1);
    }
  };

  return (
    <div className="user-details">
      <h4>Personal information</h4>
      <p>Enter your information for placing an order:</p>
      <form onSubmit={e => handleSaveInfo(e)}>
        <div className="detail">
          <label htmlFor="full-name">Full name:</label>
          <input
            type="text"
            name="full-name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
        </div>
        <div className="detail">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </div>
        <div className="detail">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="address"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </div>
        <div className="detail">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            name="country"
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
        </div>
        <div className="user-edit-btn">
          <button type="submit">Save</button>
          <span onClick={() => navigate(-1)}>Cancel</span>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;
