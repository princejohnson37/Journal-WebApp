const express = require("express");
const app = express();
const port = 3001;
const loginRoutes = require("./src/users/login/routes");
const registerRoutes = require("./src/users/register/routes");
const diaryRoutes = require("./src/diary/routes");

app.use(express.json());
app.get("/", (req, res) => {
  res.send(`
  <html>ok bye</html>
  `);
});
app.use("/api/login", loginRoutes);
app.use("/api/register", registerRoutes);
// app.use("/api/diary", diaryRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});