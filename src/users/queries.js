const checkEmailExists = "SELECT * FROM users WHERE user_email = $1";
const getPassword = "SELECT user_password FROM users WHERE user_email = $1";
const userRegister =
  "INSERT INTO users (user_name, user_email, user_password) VALUES( $1, $2, $3 )";
const getUserId = "SELECT user_id FROM users WHERE user_email = $1";

module.exports = { checkEmailExists, getPassword, userRegister, getUserId };
