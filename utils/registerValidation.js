const validator = require("validator");

const isValidUser = (username, email, password) => {
  //check if values entered for username email password
  if (!username || !email || !password)
    return {
      isError: true,
      errorMessage: "All fields must be filled",
    };
  //check if username length over 3 and under 25 characters
  if (username.length < 3 || username.length > 25)
    return {
      isError: true,
      errorMessage: "Username must be between 3 and 25 characters",
    };
  if (!/^[a-zA-Z0-9]+$/.test(username))
    //check if valid username
    return {
      isError: true,
      errorMessage:
        "Username must contain letters, numbers, dots and underscores only",
    };
  //check if valid email
  if (!validator.isEmail(email))
    return {
      isError: true,
      errorMessage: "Invalid email",
    };
  //check if strong password
  if (!validator.isStrongPassword(password))
    return { isError: true, errorMessage: "Password to weak" };

  return { isError: false, errorMessage: "" };
};

module.exports = isValidUser;
