// Import and initialize Twilio client using credentials from .env
const client = require("twilio")(
  process.env.TWILIO_SID,     // Twilio Account SID
  process.env.TWILIO_AUTH     // Twilio Auth Token
);

// Function to send OTP SMS
exports.sendSms = async (phone, otp) => {

  // Ensure Twilio "from" number is in proper E.164 format (+ prefix required)
  const fromNumber = process.env.TWILIO_PHONE.startsWith('+')
    ? process.env.TWILIO_PHONE
    : `+${process.env.TWILIO_PHONE}`;

  // Send SMS using Twilio API
  await client.messages.create({
    body: `Your Farmer Connect OTP is ${otp}. Valid for 5 minutes.`, // SMS content
    from: fromNumber,   // Verified Twilio number
    to: `+91${phone}`   // Recipient number (India country code added)
  });
};
