import express from 'express'
import dotenv from 'dotenv'
import Gamer from '../schema/gamerSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendEmailOTP } from '../utils/otp.js'
dotenv.config()

const router = express.Router()

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

router.post('/signup' , async(req , res) => {
    try {
      const {email , name , password , local , state , pincode , district,phone } = req.body
        if(!email || !name || !password || !local || !state || !pincode || !district || !phone) {
            return res.status(400).json({message: 'Fill all required fields'})
        }
        const userExist = await Gamer.findOne({email})
        if(userExist){
            return res.status(400).json({message : 'please login'})
        }
        const emailOTP = generateOTP()
        const hashedPassword = await bcrypt.hash(password , 10)
        const user = new Gamer({
            email , name , password:hashedPassword , address:{ local , state , pincode , district} , phone , emailOTP , emailOTPExpiry: Date.now() + 2*60*1000, emailVerified: false
        })
        await user.save()
        await sendEmailOTP(email , emailOTP)
        return res.status(200).json({message : 'user created successfully , please verify the user' , userId:user._id})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : 'Server Error'})
    }

})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all requirements' })
    }

    const user = await Gamer.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Please sign up first' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Password' })
    }

    if (!user.emailVerified) {
      // Send OTP again (optional)
      const emailOTP = generateOTP()
      user.emailOTP = emailOTP
      user.emailOTPExpiry = Date.now() + 2 * 60 * 1000
      await user.save()
      await sendEmailOTP(user.email, emailOTP)

      // Tell frontend to redirect to OTP
      return res.status(200).json({
        message: 'Email not verified. OTP sent again.',
        redirect: 'otp',
        userId: user._id,
      })
    }

    // If verified → issue token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.status(200).json({
      message: 'Login successful',
      user,
      token,
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server Error' })
  }
})


export default router
