const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors({
  origin: "https://saratapusoa.com",
}));
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Log it to Render console (optional)
  console.log("📬 New form submission:", { name, email, subject, message });

  // Set up transport using your email credentials
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your Gmail address
      pass: process.env.EMAIL_PASS, // your Gmail app password
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO, // your destination email
      subject: `New Message: ${subject}`,
      html: `
        <h3>You got a new message from ${name} (${email})</h3>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ message: "Email sent!" });
  } catch (error) {
    console.error("❌ Email send error:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});