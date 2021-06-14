const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validation = require("../middleware/validation");
const requestDate = require("../middleware/date");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

// Register User

router.post("/register", validation, requestDate, async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    await pool.query(
      "INSERT INTO users (user_name, user_email, user_password, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, bcryptPassword, req.requestTime]
    );

    return res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login

router.post("/login", validation, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

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
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Verify User

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete Account

router.delete("/", authorize, async (req, res) => {
  try {
    await pool.query("DELETE FROM likes WHERE user_id = $1", [req.user.id]);
    await pool.query("DELETE FROM comments WHERE user_id = $1", [req.user.id]);
    await pool.query("DELETE FROM posts WHERE user_id = $1", [req.user.id]);
    await pool.query("DELETE FROM users WHERE user_id = $1", [req.user.id]);

    res.json(true);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
