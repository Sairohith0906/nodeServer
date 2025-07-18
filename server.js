const { Console } = require('console');

require('dotenv').config()

const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const otp = getRandomInt(1000, 9999); // 4-digit OTP



async function sendMessage(){
    const message=await twilio.messages.create({
        body:'hello, i am sai rohith',
        from:'+16294654446',
        to:process.env.PHONE_NUMBER
    });
    console.log(message);
}

sendMessage();