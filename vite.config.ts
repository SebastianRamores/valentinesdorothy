import express from "express";
import path from "path";

const app = express();

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, "../dist/public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/public/index.html"));
});

app.listen(10000, () => {
  console.log("✅ Server running on port 10000");
});
