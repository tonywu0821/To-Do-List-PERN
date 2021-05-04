const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
// utils 
const jwtGenerator = require("../utils/jwtGenerator.js");
// middleware
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorize");


router.post("/register", validInfo, async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

    if (user.rows.length > 0) {
      return res.status(401).json("The Email is already used!");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);
    // Store hash in your password DB.
    // https://www.npmjs.com/package/bcrypt

    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashPassword]
    );
   
    //JWT token
    const token = jwtGenerator(newUser.rows[0].user_id);
    return res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error!");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;
  console.log("111");
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
    const token = jwtGenerator(user.rows[0].user_id);
    return res.json({ token });

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
