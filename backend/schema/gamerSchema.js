import mongoose from "mongoose";

const gamerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique:true,

    },
    password: {
        type : String,
        required:true
    },
    address: {
        local:String,
        state:String,
        district:String,
        pincode:String
    },
    phone: {
        type:String,
        required:true
    },
    //  isVerified: { type: Boolean, default: false }, // verified by admin
   // verification
    emailVerified: { type: Boolean, default: false },
  //phoneVerified: { type: Boolean, default: false },
    // temporary otp storage
  emailOTP: String,
//  phoneOTP: String,
  emailOTPExpiry: Date,
  lastOTPSent: Date,   // ✅ added to limit resend frequency
})

const Gamer = mongoose.model('Gamer' , gamerSchema)

export default Gamer