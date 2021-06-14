const router = require("express").Router();
const pool = require("../db");

// Get All Profiles

router.get("/", async (req, res) => {
  try {
    const user = await pool.query("SELECT user_id, user_name, date FROM users");

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get Specific Profile

router.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query(
      "SELECT user_id, user_name, date FROM users WHERE user_id = $1",
      [id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
