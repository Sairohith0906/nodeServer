require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Needed to parse JSON body

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Allow parsing JSON body

const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

app.get('/', (req, res) => {
  res.send('Node server running');
});

// 🟢 Accept POST request and send OTP to user-provided number
app.post('/send-otp', async (req, res) => {
  const { phone, name } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  const otp = generateOtp();
  try {
    const message = await twilio.messages.create({
      body: `Hello ${name || ''}, your OTP for Pay-Ease login is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    console.log('✅ OTP sent to', phone, ':', otp);
    res.json({ otp }); // ⚠️ For dev only
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

app.listen(3000, () => {
  console.log('🚀 Server running on port 3000');
});
