require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/contact", async (req, res) => {
  const { name, email, phone = "", message } = req.body || {};
  if (
    typeof name !== "string" || !name.trim() || name.length > 100 ||
    typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
    typeof phone !== "string" || phone.length > 30 ||
    typeof message !== "string" || !message.trim() || message.length > 3000
  ) {
    return res.status(400).json({ message: "Please enter valid contact details and a message." });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS ||
      !process.env.STORE_EMAIL || !process.env.FROM_EMAIL) {
    console.error("Email settings are missing. Configure the .env file.");
    return res.status(500).json({ message: "Email notifications are not configured yet. Please try again later." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || "false") === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    await transporter.sendMail({
      from: `"Golden Glow Website" <${process.env.FROM_EMAIL}>`,
      to: process.env.STORE_EMAIL,
      replyTo: { name: name.trim(), address: email.trim() },
      subject: `New website enquiry from ${name.trim()}`,
      text: `A new message was sent through the Golden Glow Jewellery website.\n\nName: ${name.trim()}\nEmail: ${email.trim()}\nPhone: ${phone.trim() || "Not provided"}\n\nMessage:\n${message.trim()}`
    });
    return res.json({ message: "Message sent." });
  } catch (error) {
    console.error("Email delivery failed:", error.message);
    return res.status(500).json({ message: "We couldn't send your message right now. Please try again later." });
  }
});

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Golden Glow Jewellery running at http://localhost:${PORT}`));
