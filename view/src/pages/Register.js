import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleRegistration = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== conPassword) {
      setError("Passwords must match!");
      setPassword("");
      setConPassword("");
      return;
    }

    const response = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const json = await response.json();
    //reset the fields for new register attempt
    if (!response.ok) {
      setUsername("");
      setEmail("");
      setPassword("");
      setConPassword("");
      setError(json.error);
      setIsLoading(false);
      return;
    }

    if (response.ok) {
      //add user email, username and token to local storage
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setError(false);
      toast.success("Logged in!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined,
      });
    }
    setIsLoading(false);
    navigate("/");
  };
  return (
    <div className="auth-form">
      <h3>Create Account</h3>
      <form onSubmit={e => handleRegistration(e)}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onFocus={() => setError(false)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setError(false)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onFocus={() => setError(false)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            name="confirm-password"
            value={conPassword}
            onChange={e => setConPassword(e.target.value)}
            onFocus={() => setError(false)}
            required
          />
        </div>
        {error && <div className="auth-error">{error}</div>}
        <button disabled={isLoading}>Create Account</button>
      </form>
    </div>
  );
};

export default Register;
