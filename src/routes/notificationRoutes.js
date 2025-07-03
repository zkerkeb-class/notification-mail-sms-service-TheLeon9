import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import mjml2html from "mjml";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import rateLimit from "express-rate-limit";

dotenv.config();

const router = express.Router();

// ✅ Limit: max n requests per n minutes per IP
const mailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2, // Limit each IP to 5 requests per windowMs
  message: {
    message: "❌ Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST : http://localhost:4001/notification
// {
//   "firstName": "John",
//   "lastName": "Doe",
//   "email": "john@example.com",
//   "phone": "1234567890",
//   "message": "Hello from the contact form!"
// }
router.post("/", mailLimiter, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({
        message:
          "❌ First name, last name, email, phone, and message are required.",
      });
    }

    // Load external MJML template
    const templatePath = path.join(
      process.cwd(),
      "src/templates/mail_notification.mjml"
    );
    const mjmlTemplate = fs.readFileSync(templatePath, "utf-8");

    // Replace variables in MJML template
    const compiledTemplate = handlebars.compile(mjmlTemplate);
    const compiledData = {
      Date: new Date().toLocaleString("fr-FR", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      LastName: lastName,
      Email: email,
      Phone: phone,
      Message: message,
    };

    const mjmlFilled = compiledTemplate(compiledData);

    // Convert MJML to HTML
    const { html } = mjml2html(mjmlFilled);

    // Configure Nodemailer SMTP transport
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_TO,
      subject: `📩 New contact message from ${firstName} ${lastName}`,
      html,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "✅ Email sent successfully." });
  } catch (err) {
    console.error("🔥 EMAIL ERROR:", err);
    res.status(500).json({ message: "❌ Failed to send email." });
  }
});

export { router as notificationRouter };
