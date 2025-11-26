const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors()); // ← CORS 허용
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => { res.render("index"); });

app.get("/search", (req, res) => {
  const v1 = req.query.value1 || "";
  const v2 = req.query.value2 || "";
  res.render("get_result", { v1, v2 });
});

app.post("/submit", (req, res) => {
  const text = req.body.text || "";
  res.render("post_result", { text });
});

app.get("/api/data", (req, res) => {
  res.json({
    title: "서버에서 보낸 데이터입니다.",
    timestamp: Date.now()
  });
});

app.post("/api/save", (req, res) => {
  const text = req.body.text;  // fetch에서 보낸 JSON
  console.log("클라이언트로부터 받은 데이터:", text);

  res.json({
    success: true,
    received: text,
    message: "데이터가 성공적으로 저장되었습니다."
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
