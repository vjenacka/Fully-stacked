import React from "react";

const Login = () => {
  return (
    <div className="auth-form">
      <h3>Log in</h3>
      <form>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>
        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
