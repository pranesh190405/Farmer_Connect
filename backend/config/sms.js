const client = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

exports.sendSms = async (phone, otp) => {
  // Ensure from number is in E.164 format with + prefix
  const fromNumber = process.env.TWILIO_PHONE.startsWith('+')
    ? process.env.TWILIO_PHONE
    : `+${process.env.TWILIO_PHONE}`;

  await client.messages.create({
    body: `Your Farmer Connect OTP is ${otp}. Valid for 5 minutes.`,
    from: fromNumber,
    to: `+91${phone}`
  });
};

