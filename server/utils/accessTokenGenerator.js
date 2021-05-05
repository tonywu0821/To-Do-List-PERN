const jwt = require("jsonwebtoken");
require("dotenv").config();

function accessTokenGenerator(user_id) {
  const payload = {
    user: {
      id: user_id
    }
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = accessTokenGenerator;