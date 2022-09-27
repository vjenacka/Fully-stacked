import React from "react";

const Register = () => {
  return (
    <div className="auth-form">
      <h3>Create Account</h3>
      <form>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" />
        </div>
        <div className="form-control">
          <label htmlFor="fullname">Fullname</label>
          <input type="text" name="fullname" />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>
        <div className="form-control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" name="confirm-password" />
        </div>
        <button>Create Account</button>
      </form>
    </div>
  );
};

export default Register;
