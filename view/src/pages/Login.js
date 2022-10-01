import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const json = await response.json();
    //reset the fields for new log in attempt
    if (!response.ok) {
      setUsername("");
      setPassword("");
      setError(json.error);
      setIsLoading(false);
      return;
    }

    if (response.ok) {
      //add  username and token to local storage
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
      <h3>Log in</h3>
      <form onSubmit={e => handleLogin(e)}>
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
        {error ? <div className="auth-error">{error}</div> : ""}
        <button disabled={isLoading}>Log in</button>
        <p>
          Don't have an account?{" "}
          <Link to={"/register"}>
            <b>Register now!</b>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
