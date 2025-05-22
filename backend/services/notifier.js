// backend/services/notifier.js
// Purpose: Centralized notification helpers for email, push, and SMS

require('dotenv').config();
const nodemailer = require('nodemailer');
const webpush = require('web-push');
const twilio = require('twilio');

// ---- EMAIL (Nodemailer) ----
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to, subject, text) {
  if (!to) return;
  await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
}

// ---- PUSH NOTIFICATIONS (Web Push API) ----
webpush.setVapidDetails(
  'mailto:example@domain.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

async function sendPush(user, message) {
  if (!user.pushSubscription) return;
  try {
    await webpush.sendNotification(user.pushSubscription, JSON.stringify({ title: 'Motivation', message }));
  } catch (error) {
    console.error('Push notification failed:', error.message);
  }
}

// ---- SMS (Twilio) ----
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendSMS(to, body) {
  if (!to) return;
  try {
    await twilioClient.messages.create({
      body,
      from: process.env.TWILIO_PHONE,
      to,
    });
  } catch (err) {
    console.error('SMS failed:', err.message);
  }
}

module.exports = {
  sendEmail,
  sendPush,
  sendSMS
};
