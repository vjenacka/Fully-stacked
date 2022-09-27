import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async e => {
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

    if (!response.ok) {
      setUsername("");
      setPassword("");
      setError(json.error);
    }

    if (response.ok) {
      //add  username and token to local storage
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setError(false);
    }
    setIsLoading(false);
    navigate("/");
  };
  return (
    <div className="auth-form">
      <h3>Log in</h3>
      <form onSubmit={e => handleSubmit(e)}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
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
