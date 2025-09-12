import mongoose from "mongoose";

const hostSchmea = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{
  type:String,
        required:true,
        unique:true
    },
    password:{
  type:String,
        required:true
    },
    image :{
        type:String,
        required:true

    },
    description: {
  type:String,
        required:true

    },
    role: {
        type:String,
        required:true
    },
    address: {
        state:String,
        district: String,
        pincode:String,
        local:String
    },
    links: {
        youtube: String,
        instagram: String
    }
},{timestamps:true})

const Host = mongoose.model('HOST' , hostSchmea)

export default Host