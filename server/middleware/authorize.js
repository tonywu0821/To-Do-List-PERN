const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = function(req, res, next) {
  // Get the token from the header
  const token = req.header("token");

  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }
    
  try {
    //Verify token using jwtSecret.
    const verify = jwt.verify(token, process.env.jwtSecret);
    req.user = verify.user;
    //console.log(verify);
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
