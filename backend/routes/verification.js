import express from 'express';
import { sendEmailOTP } from '../utils/otp.js';
import Gamer from '../schema/gamerSchema.js';

const router = express.Router();

router.post('/verify-email', async (req, res) => {
  try {
    const { gamerId, otp } = req.body;

    const gamer = await Gamer.findById( gamerId );
    if (!gamer) {
      return res.status(404).json({ message: 'School not found' });
    }
       // console.log("School found:", school._id);
    //console.log("DB OTP:", school.emailOTP, "Entered OTP:", otp);
    //console.log("Expiry:", school.emailOTPExpiry, "Now:", Date.now());

    // Cast OTPs to string for comparison
    if (
      String(gamer.emailOTP) !== String(otp) ||
      gamer.emailOTPExpiry < Date.now()
    ) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    gamer.emailVerified = true;
    gamer.emailOTP = null;
    gamer.emailOTPExpiry = null;
    await gamer.save();

    return res.status(200).json({success:true, message: 'Email Verified Successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error: error.message,
    });
  }
});


// utility function to generate otp
//const generateOTP = () => Math.floor(100000 + Math.random() * 900000);


router.post('/resend-otp', async (req, res) => {
  try {
    const { gamerId } = req.body;

    const game = await Gamer.findById(gamerId);
    if (!game) return res.status(404).json({ message: 'School not found' });

    // prevent spamming
    if (game.lastOTPSent && Date.now() - game.lastOTPSent < 2 * 60 * 1000) {
      return res.status(429).json({ message: 'Wait 2 minutes before requesting another OTP' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    game.emailOTP = otp;
    game.emailOTPExpiry = Date.now() + 2 * 60 * 1000;
    game.lastOTPSent = Date.now();
    await game.save();

    // 📧 Send email again
    await sendEmailOTP(game.email, otp);

    res.status(200).json({ success: true, message: 'OTP resent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;
