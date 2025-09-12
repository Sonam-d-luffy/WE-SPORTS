import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export const sendEmailOTP = async(email , otp) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Slot booking Signup OTP',
        text: `Your OTP is ${otp}. It will expire in 2 minutes.`,
        
    })
}

// const client = twilio(process.env.TWILIO_SID , process.env.TWILIO_AUTH)

// export const  sendPhoneOTP = async(phone , otp) => {
//     await client.messages.create({
//        body: `Your School Signup OTP is ${otp}. Valid for 5 minutes.`,
//     from: process.env.TWILIO_PHONE, 
//     to: phone,
//     })
// }
