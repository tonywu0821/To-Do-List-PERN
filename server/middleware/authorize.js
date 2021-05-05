const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = function(req, res, next) {

  // TO-DO change the archtecture to accesstoken and refreshtoken
  // Get the token from the header
  // {'authorization' : Bearer [token]}
  //const authHeader = req.headers['authorization'];
  //const token = authHeader && authHeader.split(' ')[1];
   
  const token = req.header("authorization");

  console.log(req.header);

  if (!token) {
    return res.status(401).json({ msg: "authorization denied" });
  }   // 403 or 401?

  try {
    //Verify token using jwtSecret.
    const verify = jwt.verify(token, process.env.jwtSecret);
    req.user = verify.user;
    //console.log(verify);
    next();
  } catch (err) {
    res.status(403).json({ msg: "Token is not valid" }); //403 or 401?
  }
};
