const router = require("express").Router();
const authorize = require("../middleware/authorize");
const requestDate = require("../middleware/date");
const pool = require("../db");

//Get All Posts

router.get("/", async (req, res) => {
  try {
    const posts = await pool.query(
      "SELECT u.user_name, u.user_id, u.date, p.post_id, p.header, p.subheader, p.post, p.category, p.date, p.date_updated FROM users AS u RIGHT JOIN posts AS p ON u.user_id = p.user_id ORDER BY p.post_id DESC"
    );

    res.json(posts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//Get Current Users Posts

router.get("/myposts", authorize, async (req, res) => {
  try {
    const posts = await pool.query(
      "SELECT u.user_name, u.user_id, u.date, p.post_id, p.header, p.subheader, p.post, p.category, p.date, p.date_updated FROM users AS u RIGHT JOIN posts AS p ON u.user_id = p.user_id WHERE u.user_id = $1 ORDER BY p.post_id DESC",
      [req.user.id]
    );

    res.json(posts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//Create a Post

router.post("/", authorize, requestDate, async (req, res) => {
  try {
    const { header, subheader, post, category } = req.body;

    await pool.query(
      "INSERT INTO POSTS (user_id, header, subheader, post, category, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [req.user.id, header, subheader, post, category, req.requestTime]
    );

    return res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//Update a Post

router.put("/:id", authorize, requestDate, async (req, res) => {
  const { header, subheader, post, category } = req.body;

  try {
    const { id } = req.params;

    console.log(id);

    const updatePost = await pool.query(
      "UPDATE posts SET header = $1, subheader = $2, post = $3, category = $4, date_updated = $5 WHERE post_id = $6 AND user_id = $7 RETURNING *",
      [header, subheader, post, category, req.requestTime, id, req.user.id]
    );

    if (updatePost.rows.length === 0) {
      return res.status(401).json("You are not authorized to modify this post");
    }

    res.json(true);
  } catch (err) {
    console.error(err.message);
  }
});

//Delete a Post

router.delete("/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await pool.query(
      "DELETE FROM posts WHERE post_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deletePost.rows.length === 0) {
      return res.status(401).json("You are not authorized to delete this post");
    }

    res.json(true);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
