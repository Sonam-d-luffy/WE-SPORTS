import express from 'express'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import Host from '../Schema/hostSchema.js'
import jwt from 'jsonwebtoken'
import uploads from '../utils/multer.js'

dotenv.config()

const router = express.Router()


router.post('/signup' ,uploads.single('image') , async(req , res) => {
    try {
        const {name , email , password , role  , local ,youtube , instagram, pincode , state , district , description  , secretkey} = req.body
        if(!name || !email || !password || !role  || !pincode || !state || !district || !local || !description || !secretkey){
            return res.status(400).json({message: 'Please fill all fields'})
        }
        const hostExist = await Host.findOne({email})
        if(hostExist) return res.status(400).json({message: 'Host already exist , please sign in'})
        if(secretkey !== process.env.SECRET_KEY){
            return res.status(400).json({message: 'Sorry , Not a host'})
        }

        const hashedPassword = await bcrypt.hash(password , 10)
        const newHost =  Host({
            name , email , password:hashedPassword , role , image: req.file ? req.file.path.replace("\\", "/") : null , links : {youtube , instagram}, address: {state , local , pincode , district} , description
        })
        await newHost.save()
        return res.status(200).json({message: 'New host created successfully' , host:newHost})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Server error'})
    }
})

router.post('/login' , async(req , res) => {
    try {
        const {email , password } = req.body
       if(!email || !password) {
        return res.status(400).json({message: 'Fill all fields'})
       }
       const user = await Host.findOne({email})
       if(!user){
        return res.status(404).json({message: 'Please Register first'})
       }
       const isMatch = await bcrypt.compare(password , user.password)
       if(!isMatch){
        return res.status(404).json({message: 'Invalid Password'})
       }
       const token = jwt.sign({id : user._id },process.env.JWT_SECRET , {expiresIn: '1h'})
       return res.status(200).json({message: 'Login Successful' , token , user: user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : 'Server Error'})
    }
       
})

router.get('/allhosts' , async(req , res) => {
    try {
        const hosts = await Host.find()
        if(!hosts || hosts.length === 0){
            return res.status(404).json({message : 'No hosts found'})
        }
        return res.status(200).json({message : 'All hosts' , hosts : hosts})    
    } catch (error) {
            console.log(error)
        return res.status(500).json({message : 'Server Error'})
    }
})
export default router