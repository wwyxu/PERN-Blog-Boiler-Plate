const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Routes

app.use("/authentication", require("./routes/authentication"));
app.use("/profiles", require("./routes/profiles"));
app.use("/posts", require("./routes/posts"));

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
