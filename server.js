require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Enable CORS for all requests
app.use(cors());

// Generate a 4-digit OTP
function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

app.get('/send-otp', async (req, res) => {
  const otp = generateOtp();

  try {
    const message = await twilio.messages.create({
      body: `Your OTP is: ${otp}`,
      from: '+16294654446', // Replace with your Twilio phone number
      to: process.env.PHONE_NUMBER,
    });

    console.log('✅ OTP sent:', otp);
    res.json({ otp }); // For dev only
  } catch (err) {
    console.error('❌ Error sending OTP:', err);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

app.listen(3000, () => {
  console.log('🚀 Server running on port 3000');
});
