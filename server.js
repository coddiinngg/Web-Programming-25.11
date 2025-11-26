const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/search", (req, res) => {
  const v1 = req.query.value1;
  const v2 = req.query.value2;

  if (v1 !== undefined && v2 !== undefined) {
    return res.render("get_result", { v1, v2 });
  }

  const query = req.query.q || "";
  res.render("get_result", { query });
});

app.post("/submit-form", (req, res) => {
  const v1 = Number(req.body.value1);
  const v2 = Number(req.body.value2);
  const r1 = v1 % v2;
  res.render("form_result", { r1, v1, v2 });
});

app.post("/submit", (req, res) => {
  const text = req.body.text || "";
  res.render("post_result", { text });
});

app.get("/api/data", (req, res) => {
  res.json({
    title: "서버에서 보낸 데이터입니다.",
    timestamp: Date.now(),
  });
});

app.post("/api/save", (req, res) => {
  const text = req.body.text;
  res.json({
    success: true,
    received: text,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
