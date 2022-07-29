const path = require("path");
const express = require("express");
const { getPeoples } = require("./get-peoples");

const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const peoples = await getPeoples();

  return res.render("peoples", { peoples });
});

app.listen(PORT, () => {
  console.log("server running...");
});
