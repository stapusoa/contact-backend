const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "https://saratapusoa.com",
  methods: ["POST"],
}));
app.use(express.json());

app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log("📬 New message:", { name, email, subject, message });

  res.status(200).json({ message: "Message received!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});