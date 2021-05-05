const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
//const jwt = require('jsonwebtoken')

// utils 
const accessTokenGenerator = require("../utils/accessTokenGenerator.js");
// middleware
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorize");

// let refreshTokens = [];
// router.post("/token", async (req, res) => {
//   const refreshToken = req.body.token;
//   if (refreshToken == null) return res.sendStatus(401);
//   if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     const accessToken = accessTokenGenerator({});
//     res.json({accessToken: acessToken});
//   })
// });

// router.delete('/logout', (req, res) => {
//   refreshTokens = refreshTokens.filter(token => token !== req.body.token)
//   res.sendStatus(204)
// })

router.post("/register", validInfo, async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

    if (user.rows.length > 0) {
      return res.status(401).json("The Email is already used!");
    }

    // Store hash in your password DB.
    // https://www.npmjs.com/package/bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);
    

    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashPassword]
    );
   
    //JWT token
    const accessToken = accessTokenGenerator(newUser.rows[0].user_id);
    return res.json({ accessToken });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error!");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const accessToken = accessTokenGenerator(user.rows[0].user_id);
    return res.json({ accessToken });
    // return res.json({ accessToken:accessToken });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
