const express = require("express");
const app = express();
const cors = require('cors')
const port = 3001;
app.use(cors());
app.use(express.json());
const loginRoutes = require("./src/users/login/routes");
const registerRoutes = require("./src/users/register/routes");
const diaryRoutes = require("./src/diary/routes");



app.get("/", (req, res) => {
  res.send(`
  <html>ok bye</html>
  `);
});
app.use("/api/login", loginRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/diary", diaryRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});