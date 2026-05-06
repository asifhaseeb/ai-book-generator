const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(subject, message) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_EMAIL,
      subject,
      text: message,
    });

    console.log("📧 Email sent:", subject);

  } catch (err) {
    console.log("❌ Email error:", err.message);
  }
}

module.exports = { sendEmail };